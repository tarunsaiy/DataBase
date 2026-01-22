import mongoose from "mongoose";
const LogSchema = new mongoose.Schema({
    number: {
        type: String,
    },
    time :{
        type: String
    },
    status : {
        type: Number
    }
}, {timestamps: true},
    
);
LogSchema.pre("save", function (next) {
    const now = new Date();

    const istTime = now.toLocaleString("en-IN", { 
        timeZone: "Asia/Kolkata", 
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    // istTime is "HH:mm:ss"
    this.time = istTime;
   
});
LogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 72000 });
const LogModel = mongoose.model('log', LogSchema);
export default LogModel;