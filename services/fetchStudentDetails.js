import axios from "axios";

function deriveYearFromSemester(semester) {
    if (!semester) return undefined;
    const match = semester.match(/^(I{1,3}|IV|V|VI|VII|VIII)\s+Semester/i);
    if (!match) return undefined;
    const semMap = { I: 1, II: 1, III: 2, IV: 2, V: 3, VI: 3, VII: 4, VIII: 4 };
    return String(semMap[match[1].toUpperCase()]);
}

function mapToUserFields(data) {
    const bio = data?.bio || {};

    return {
        name: bio.name,
        year: deriveYearFromSemester(bio.semester),
        semester: bio.semester,
        branch: bio.branch,
        phonenumber: bio.mobile,
        email: bio.email,
        gender: bio.gender,
        lastupdated: new Date(),
    };
}

export async function fetchStudentDetails(studentId, password) {
    const baseUrl = process.env.VIIT_DETAILS_API;
    if (!baseUrl) {
        throw new Error("VIIT_DETAILS_API is not configured");
    }

    try {
        const { data } = await axios.get(baseUrl, {
            params: { student_id: studentId, password },
        });

        if (!data?.bio) {
            throw new Error("Invalid VIIT API response");
        }

        return mapToUserFields(data);
    } catch (err) {
        if (err.response) {
            throw new Error(`VIIT API returned ${err.response.status}`);
        }
        throw err;
    }
}
