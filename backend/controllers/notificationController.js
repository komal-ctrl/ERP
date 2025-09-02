import Notification from "../models/Notification.js";

/**
 * Create a new notification
 * Can be for a specific user or broadcast to a role
 */
export const createNotification = async (req, res) => {
  try {
    const {
      title,
      message,
      type,
      // targetUser, // optional: specific user
      targetRole, // optional: broadcast role
      priority,
      // link,
      // expiresAt,
    } = req.body;

    const notification = await Notification.create({
      title,
      message,
      type,
      // targetUser: targetUser || null,
      targetRole: targetRole || "student",
      priority: priority || "normal",
      // link: link || null,
      // expiresAt: expiresAt || null,
    });

    res.status(201).json({ success: true, notification });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get notifications for a user
 * If userId is provided → get personal + broadcast to their role
 * If admin → can fetch all
 */
export const getNotifications = async (req, res) => {
  try {
    const { role } = req.params; // e.g. from req.user in auth middleware

    // if (userId) {
    //   query = {
    //     $or: [
    //       { targetUser: userId },
    //       { targetUser: null, targetRole: role }, // broadcast to role
    //     ],
    //   };
    // }

    const notifications = await Notification.find({ targetRole: role })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllNotifications = async (req, res) => {
  try {
    // e.g. from req.user in auth middleware

    // if (userId) {
    //   query = {
    //     $or: [
    //       { targetUser: userId },
    //       { targetUser: null, targetRole: role }, // broadcast to role
    //     ],
    //   };
    // }

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const viewNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findById({ _id: id });
    return res.status(200).json({ success: true, notification });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
/**
 * Mark notification as read
 */
// export const markAsRead = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const notification = await Notification.findByIdAndUpdate(
//       id,
//       { isRead: true },
//       { new: true }
//     );

//     if (!notification) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Notification not found" });
//     }

//     res.status(200).json({ success: true, notification });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

/**
 * Delete notification (admin only)
 */
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res
        .status(404)
        .json({ success: false, message: "Notification not found" });
    }

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
