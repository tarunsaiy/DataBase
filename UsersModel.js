import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
    number : {
        type: String
    },
    password : {
        type : String
    },
    level : {
        type : Number
    }
}, {timestamps: true});
const StudentModel = mongoose.model('Student', StudentSchema);
export default StudentModel;
