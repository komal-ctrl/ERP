import express from "express";
import {
  createNotification,
  getNotifications,
  // markAsRead,
  viewNotification,
  deleteNotification,
  getAllNotifications,
} from "../controllers/notificationController.js";
import verifyToken from "../middleware/authMiddleware.js";
const router = express.Router();

// POST /api/notifications → create
router.post("/", createNotification);
router.get("/view/:id", viewNotification);

// GET /api/notifications?userId=123&role=student → list for user
router.get("/all", verifyToken, getAllNotifications);
router.get("/:role", getNotifications);

// PATCH /api/notifications/:id/read → mark as read
// router.patch("/:id/read", markAsRead);

// DELETE /api/notifications/:id → delete
router.delete("/:id", deleteNotification);

export default router;
