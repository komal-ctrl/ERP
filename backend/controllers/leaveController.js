import Student from "../models/Student.js";
import Leave from "../models/Leave.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const student = await Student.findOne({ userId });
    const newLeave = new Leave({
      studentId: student._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role == "admin") {
      leaves = await Leave.find({ studentId: id });
    } else {
      const student = await Student.findOne({ userId: id });
      leaves = await Leave.find({ studentId: student._id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "studentId",
      populate: [
        { path: "department", select: "dep_name" },
        { path: "userId", select: "name" },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getLeavedetail = async (req, res) => {
  try {
    const id = req.params.id;

    const leave = await Leave.findById({ _id: id }).populate({
      path: "studentId",
      populate: [
        { path: "userId", select: "name  profileImage" },
        { path: "department", select: "dep_name" },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );
    if (!leave) {
      return res
        .status(404)
        .json({ success: false, message: "leave not found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { addLeave, getLeave, getLeaves, getLeavedetail, changeStatus };
