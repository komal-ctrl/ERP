import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addDepartment,
  getDepartments,
  editDepartment,
  getDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";
import {
  addProgramToDepartment,
  editProgram,
  getPrograms,
  getProgram,
  deleteProgram,
  getProgramsByDepartment,
} from "../controllers/programController.js";

const router = express.Router();

// Program routes inside department
router.get("/programs", authMiddleware, getPrograms);
router.get("/programs/:id", authMiddleware, getProgram);
router.post("/:id/programs", authMiddleware, addProgramToDepartment);
router.get("/:id/programs", authMiddleware, getProgramsByDepartment);
router.put("/programs/:programId", authMiddleware, editProgram);
router.delete("/programs/:programId", authMiddleware, deleteProgram);
router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, getDepartment);
router.put("/:id", authMiddleware, editDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
