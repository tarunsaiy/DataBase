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
    status: {
      type: Number
    },
    server: {
      type: Number
    },
    response: {
      type: Number
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * Pre-save hook
 * - Sets IST time for display
 * - Sets expiry to next UTC midnight
 */
LogSchema.pre("save", function (next) {
  const now = new Date();

  // IST time (for UI / logs)
  this.time = now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // Next UTC midnight (00:00 UTC)
  this.expiresAt = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0
    )
  );

  next();
});

/**
 * TTL Index
 * Deletes documents automatically after expiresAt
 */
LogSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const LogModel = mongoose.model("log", LogSchema);
export default LogModel;
