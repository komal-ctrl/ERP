import React from "react";

const NotificationPopup = ({ notification, onClose }) => {
  if (!notification) return null; // Don't render if no notification

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-96 relative">
        <h2 className="text-lg font-semibold mb-2">Latest Notification</h2>
        <p className="text-gray-700 mb-4">{notification.message}</p>

        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;
