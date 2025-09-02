import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog } from "@headlessui/react";

export const column = [
  { name: "S No", selector: (row) => row.sno, width: "70px" },
  { name: "Type", selector: (row) => row.type, width: "120px" },
  { name: "Priority", selector: (row) => row.priority, width: "120px" },
  { name: "Title", selector: (row) => row.title, width: "140px" },
  { name: "Action", selector: (row) => row.action, center: true },
];

export const NotificationButtons = ({ Id, role, onNotificationDelete }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/notifications/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onNotificationDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  const handleView = async (id) => {
    setIsOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/notifications/view/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setNotification(response.data.notification);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
        onClick={() => handleView(Id)}
      >
        View
      </button>
      {role === "admin" && (
        <button
          className="px-4 ml-3.5 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => handleDelete(Id)}
        >
          Delete
        </button>
      )}

      {/* Modal */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {/* Background overlay */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            {loading ? (
              <p>Loading...</p>
            ) : notification ? (
              <>
                <Dialog.Title className="text-xl font-bold mb-4 text-center">
                  {notification.title}
                </Dialog.Title>
                <div className="space-y-3">
                  <div className="flex space-x-3">
                    <p className="font-bold">Message:</p>
                    <p>{notification.message}</p>
                  </div>
                  <div className="flex space-x-3">
                    <p className="font-bold">Type:</p>
                    <p>{notification.type}</p>
                  </div>
                  <div className="flex space-x-3">
                    <p className="font-bold">Created At:</p>
                    <p>{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button
                    className="px-4 py-1 bg-gray-600 rounded text-white hover:bg-gray-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <p>No data available</p>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};
