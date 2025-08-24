import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addStudent,
  upload,
  getStudents,
  getStudent,
  editStudent,
  fetchStudentsByProgramId,
  deleteStudent,
} from "../controllers/studentController.js";
const router = express.Router();

router.get("/", authMiddleware, getStudents);
router.post("/add", authMiddleware, upload.single("image"), addStudent);
router.get("/:id", authMiddleware, getStudent);
router.put("/:id", authMiddleware, editStudent);

router.get("/program/:id", authMiddleware, fetchStudentsByProgramId);
router.delete("/:id", authMiddleware, deleteStudent);

// router.delete("/:id", authMiddleware, deleteDepartment);
export default router;
