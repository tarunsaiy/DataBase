import mongoose from "mongoose"
const ServerSchema = new mongoose.Schema({
    server : {
        type : Number,
        default : 1
    }
})
const ServerModel = mongoose.model("Server", ServerSchema);
export default ServerModel;
