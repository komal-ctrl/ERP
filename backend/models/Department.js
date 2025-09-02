import mongoose, { Schema } from "mongoose";

import Student from "./Student.js";
import User from "./User.js";
import Program from "./Program.js";

const departmentSchema = new mongoose.Schema({
  dep_name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
departmentSchema.pre(
  "deleteOne",
  {
    document: true,
    query: false,
  },
  async function (next) {
    try {
      const students = await Student.find({ department: this._id });
      // const studentIds = students.map((student) => student._id);
      const userIds = students.map((student) => student.userId);
      await Student.deleteMany({ department: this._id });
      await Program.deleteMany({ department: this._id });
      // console.log("User IDs to delete:", userIds);

      // await Leave.deleteMany({ studentId: { $in: studentIds } });
      // await Salary.deleteMany({ employeeId: { $in: empIds } });
      await User.deleteMany({ _id: { $in: userIds } });
      next();
    } catch (error) {
      next(error);
    }
  }
);
const Department = mongoose.model("Department", departmentSchema);
export default Department;
