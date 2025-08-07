const userModel = require("../models/user");
const studentModel = require("../models/students");
const teacherModel = require("../models/teachers");
// module.exports.profile = async function (req, res) {
//   try {
//     if (req.user.role == "student") {
//       let user = await studentModel
//         .findOne({ userId: req.user._id })
//         .populate("userId");
//       res.status(200).json({
//         user: user,
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };
module.exports.profile = async function (req, res) {
  try {
    if (req.user.role === "student") {
      let student = await studentModel
        .findOne({ userId: req.user._id })
        .populate("userId");
      if (!student)
        return res.status(404).json({ message: "Student not found" });
      return res.status(200).json({ user: student });
    }
    if (req.user.role === "teacher") {
      let teacher = await teacherModel
        .findOne({ userId: req.user._id })
        .populate("userId");
      if (!teacher)
        return res.status(404).json({ message: "Teacher not found" });
      return res.status(200).json({ user: teacher });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
};
