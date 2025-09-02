import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ["exam", "fee", "event", "general"],
    default: "general",
  },
  // targetUser: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   default: null,
  // },
  targetRole: {
    type: String,
    enum: ["student", "teacher"],
    default: "student",
  },
  // isRead: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ["low", "normal", "high"],
    default: "normal",
  },
  // link: { type: String },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
});

export default mongoose.model("Notification", notificationSchema);
