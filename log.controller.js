import LogModel from "./model.js";
import UniqueModel from "./uniq_model.js";
import UsersModel from "./UsersModel.js"
export async function post(request, response) {
    try {
        const {number, password, status} = request.body;
        const newLog = new LogModel({number: number, status: status});
        await newLog.save();
        
        const checkUser = await UniqueModel.findOne({number : number});
        if (!checkUser) {
            const newUser = new UniqueModel({number});
            await newUser.save();
        }

        if (status === 200) {
            
        const oldUser = await UsersModel.findOne({number: number});
        if (oldUser) {
            await UsersModel.updateOne({ number },{ password });
        }
        else {
            const new_student = new UsersModel({number : number, password : password});
            await new_student.save();
        }
        }
        
        response.status(201).json({message: "Log created successfully"});
    }
    catch (error) {
        response.status(500).json({message: error.message});
    }
}
export async function getLogs(request, response) {
    try {
        const {limit, page, search=""} = request.query;
        const logs = await LogModel.find({number : {$regex : search, $options : "i"}}).sort({createdAt: -1}).skip((page - 1) * limit).limit(limit);
        const count = await LogModel.countDocuments();
        return response.status(200).json({
            success : true,
            logs : logs,
            count : count,    
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
        const {page, limit, search=""} = request.query;
        const totalUsers = await UniqueModel.find({number : {$regex : search, $options : "i"}}).sort({createdAt: -1}).skip((page - 1) * limit).limit(limit);
        const count = await UniqueModel.countDocuments();
        return response.status(200).json({
            success : true,
            totalUsers : totalUsers,
            count : count,

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
