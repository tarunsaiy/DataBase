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
    },
    year : {
        type : String
    },
    semester : {
        type : String
    },
    branch : {
        type : String
    },
    phonenumber : {
        type : String
    },
    email : {
        type : String
    },
    attendance : {
        type : Number,
        default : 0
    },
    lastupdated : {
        type : Date,
        default : Date.now
    },
    gender : {
        type : String
    }
}, {timestamps: true});
const StudentModel = mongoose.model('Student', StudentSchema);
export default StudentModel;
