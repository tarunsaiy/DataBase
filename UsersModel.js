import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
    number : {
        type: String
    },
    password : {
        type : String
    },
    level : {
        type : Number,
        default : 1
    }
}, {timestamps: true});
const StudentModel = mongoose.model('Student', StudentSchema);
export default StudentModel;
