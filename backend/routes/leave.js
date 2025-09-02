import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeave,
  getLeaves,
  getLeavedetail,
  changeStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", authMiddleware, addLeave);
router.get("/detail/:id", authMiddleware, getLeavedetail);
router.get("/:id/:role", authMiddleware, getLeave);
router.get("/", authMiddleware, getLeaves);

router.put("/:id", authMiddleware, changeStatus);

export default router;
