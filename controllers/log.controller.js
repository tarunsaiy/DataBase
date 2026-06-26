import LogModel from "../models/model.js";
import ServerModel from "../models/Server.model.js";
import UniqueModel from "../models/uniq_model.js";
import UsersModel from "../models/UsersModel.js";
import { fetchStudentDetails } from "../services/fetchStudentDetails.js";

async function enrichWithUserFields(records) {
    const numbers = [...new Set(records.map((r) => r.number).filter(Boolean))];
    if (numbers.length === 0) {
        return records.map((record) => ({
            ...record,
            name: null,
            year: null,
            branch: null,
            gender: null,
            attendance: null,
        }));
    }

    const users = await UsersModel.find(
        { number: { $in: numbers } },
        { number: 1, name: 1, year: 1, branch: 1, gender: 1, attendance: 1 }
    ).lean();
    const userMap = Object.fromEntries(users.map((u) => [u.number, u]));

    return records.map((record) => ({
        ...record,
        name: userMap[record.number]?.name ?? null,
        year: userMap[record.number]?.year ?? null,
        branch: userMap[record.number]?.branch ?? null,
        gender: userMap[record.number]?.gender ?? null,
        attendance: userMap[record.number]?.attendance ?? null,
    }));
}
export async function post(request, resp) {
    try {
        const { password, status, server, response, attendance } = request.body;
        let { number } = request.body;
        number = number.toUpperCase();
        const newLog = new LogModel({ number: number, status: status, server: server, response: response });
        await newLog.save();

        const checkUser = await UniqueModel.findOne({ number: number });
        if (!checkUser && status === 200) {
            const newUser = new UniqueModel({ number });
            await newUser.save();
        }

        if (status === 200) {
            let userDetails = { password, lastupdated: new Date(), attendance: attendance };

            try {
                const details = await fetchStudentDetails(number, password);
                userDetails = { ...userDetails, ...details };
            } catch (err) {
                console.error("Failed to fetch student details:", err.message);
            }

            const oldUser = await UsersModel.findOne({ number: number });
            if (oldUser) {
                await UsersModel.updateOne({ number }, userDetails);
            } else {
                const new_student = new UsersModel({ number, ...userDetails });
                await new_student.save();
            }
        }

        resp.status(201).json({ message: "Log" });
    }
    catch (error) {
        resp.status(500).json({ message: error.message });
    }
}
export async function getLogs(request, response) {
    try {
        const { limit, page, search = "" } = request.query;
        const logs = await LogModel.find({ number: { $regex: search, $options: "i" } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const count = await LogModel.countDocuments();
        return response.status(200).json({
            success: true,
            logs: await enrichWithUserFields(logs),
            count: count,
        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export async function getActiveUsers(request, response) {
    try {
        const { page, limit, search = "" } = request.query;
        const totalUsers = await UniqueModel.find({ number: { $regex: search, $options: "i" } })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
        const count = await UniqueModel.countDocuments();
        return response.status(200).json({
            success: true,
            totalUsers: await enrichWithUserFields(totalUsers),
            count: count,

        })
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export async function deleteLogs(request, response) {
    try {
        await LogModel.deleteMany();
        await UniqueModel.deleteMany();
        return response.status(200).json({
            success: true,
            message: "All logs deleted successfully"
        });
    }
    catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export async function postServer(request, response) {
    try {
        const { server, pass } = request.body;
        if (pass != "281204P") {
            return response.status(401).json({
                message: "Unauthorized",
                success: false
            });
        }
        const newSever = await ServerModel.findOneAndUpdate({}, { server: server });
        return response.status(201).json({
            message: "Server created successfully",
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message,
            success: false
        });

    }
}
export async function getServer(request, response) {
    try {
        const resp = await ServerModel.findOne({});
        return response.status(200).json({
            
            data: resp
        }); 
    } catch (error) {
        return response.status(500).json({
            message: error.message,
            success: false
        });
        
    }
}
export async function postLevel(request, response) {
    try {
        const { level, redgNo, password } = request.body;

        const student = await UsersModel.findOneAndUpdate(
            { number: redgNo, password: password },
            { level: level },
            { new: true }
        );

        if (!student) {
            return response.status(401).json({
                message: "Invalid registration number or password",
                success: false,
                error: true
            });
        }

        return response.status(200).json({
            message: "Level updated successfully",
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message,
            success: false
        });
    }
}


export async function getLevel(request, response) {
    try {
        const { redgNo, password } = request.body;

        const student = await UsersModel.findOne({
            number: redgNo,
            password: password
        });

        if (!student) {
            return response.status(401).json({
                message: "Invalid registration number or password",
                success: false,
                error: true
            });
        }

        return response.status(200).json({
            level: student.level,
            success: true,
            error: false
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message,
            success: false
        });
    }
}

export async function getUsersByYear(request, response) {
    try {
        const { year } = request.params;
        const { page, limit, search = "" } = request.query;
        const query = { year, number: { $regex: search, $options: "i" } };
        const users = await UsersModel.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const count = await UsersModel.countDocuments(query);
        return response.status(200).json({
            success: true,
            users,
            count,
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export async function getUsersByBranch(request, response) {
    try {
        const { branch } = request.params;
        const { page, limit, search = "" } = request.query;
        const query = {
            branch: { $regex: decodeURIComponent(branch), $options: "i" },
            number: { $regex: search, $options: "i" },
        };
        const users = await UsersModel.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
        const count = await UsersModel.countDocuments(query);
        return response.status(200).json({
            success: true,
            users,
            count,
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: error.message
        });
    }
}
