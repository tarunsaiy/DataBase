import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true
    },
    time: {
      type: String
    },
    status: Number,
    server: Number,
    response: Number,
    expiresAt: {
      type: Date,
      required: true,
      default: () => {
        const now = new Date();
        return new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            0,
            0,
            0
          )
        );
      }
    }
  },
  { timestamps: true }
);

/**
 * Only for display time (IST)
 */
LogSchema.pre("save", function (next) {
  const now = new Date();
  this.time = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  next();
});

/**
 * TTL index
 */
LogSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("log", LogSchema);
