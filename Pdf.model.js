import mongoose from "mongoose";
const PdfSchema = new mongoose.Schema({
    Branch : {
        type : String,
        required : true
    },
    Year :{
        type : String,
        required : true
    },
    Subject : {
        type : String,
        required : true
    },
    RedgNo : {
        type : String,
        required : true
    },
    Url : {
        type : String,
        required : true
    },
    Title : {
        type : String,
        required : true
    },
    Status : {
        type : Boolean,
        default : true
    }
})
const PdfModel = mongoose.model("Pdf", PdfSchema);
export default PdfModel