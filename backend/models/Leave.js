import mongoose, { Schema } from "mongoose";
const leaveSchema = new mongoose.Schema({
  studentId: { type: Schema.Types.ObjectId, ref: "Student", require: true },
  leaveType: {
    type: String,
    enum: ["Sick Leave", "Casual Leave", "Annual Leave"],
    require: true,
  },
  reason: { type: String, require: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },

  startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
});
const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
