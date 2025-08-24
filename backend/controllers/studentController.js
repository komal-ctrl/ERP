import User from "../models/User.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import Department from "../models/Department.js";
import Student from "../models/Student.js";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
const addStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      studentId,
      dob,
      gender,
      department,
      program,
      password,
      semester,
      enrollmentYear,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(500)
        .json({ success: false, error: "User already registered in emp" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,

      password: hashPassword,
      role: "student",
      profileImage: req.file ? req.file.filename : "",
    });
    const savedUser = await newUser.save();
    const newStudent = new Student({
      userId: savedUser._id,
      studentId,
      department,
      program,
      enrollmentYear,
      gender,
      dob,
      semester,
    });
    await newStudent.save();
    return res.status(200).json({ success: true, message: "Student created" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error:
        error.message || "Unexpected server error occurred. Please try again.",
    });
  }
};
const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("userId", { password: 0 })
      .populate("department")
      .populate({
        path: "program",
        populate: { path: "department" }, // nested populate inside program
      });
    return res.status(200).json({ success: true, students });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const getStudent = async (req, res) => {
  const { id } = req.params;
  try {
    let student;
    student = await Student.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department")
      .populate({
        path: "program",
        populate: { path: "department" }, // nested populate inside program
      });
    if (!student) {
      student = await Student.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department")
        .populate({
          path: "program",
          populate: { path: "department" }, // nested populate inside program
        });
    }
    return res.status(200).json({ success: true, student });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dob, gender, department, program, semester, enrollmentYear } =
      req.body;
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ success: false, error: error.message });
    }
    const user = await User.findById(student.userId);

    if (!user) {
      return res.status(404).json({ success: false, error: error.message });
    }
    const updateUser = await User.findByIdAndUpdate(
      { _id: student.userId },
      { name },
      { new: true }
    );
    const updateStudent = await Student.findByIdAndUpdate(
      { _id: id },
      { department, program, dob, gender, enrollmentYear, semester },
      { new: true }
    );
    if (!updateUser || !updateStudent) {
      return res.status(404).json({ success: false, error: error.message });
    }
    return res.status(200).json({ success: true, message: "student updated" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const fetchStudentsByDepId = async (req, res) => {
  const { id } = req.params;
  try {
    const students = await Student.find({ department: id });

    return res.status(200).json({ success: true, students });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
const fetchStudentsByProgramId = async (req, res) => {
  const { id } = req.params; // program ID
  try {
    const students = await Student.find({ program: id })
      .populate("userId", { password: 0 }) // optional
      .populate("department") // optional, if still needed
      .populate("program"); // optional, for details

    return res.status(200).json({ success: true, students });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteStu = await Student.findById({ _id: id });
    await deleteStu.deleteOne();
    return res.status(200).json({ success: true, deleteStu });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export {
  addStudent,
  upload,
  getStudents,
  getStudent,
  editStudent,
  fetchStudentsByProgramId,
  fetchStudentsByDepId,
  deleteStudent,
};
