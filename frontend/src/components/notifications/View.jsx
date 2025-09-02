import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchNotification = async () => {
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
      }
    };
    fetchNotification();
  }, [id]);

  return (
    <>
      {notification ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-8 text-center">
            {notification.title}
          </h2>
          <div className="space-y-5">
            <div className="flex space-x-3">
              <p className="text-lg font-bold">Message:</p>
              <p className="font-medium">{notification.message}</p>
            </div>
            <div className="flex space-x-3">
              <p className="text-lg font-bold">Type:</p>
              <p className="font-medium">{notification.type}</p>
            </div>
            <div className="flex space-x-3">
              <p className="text-lg font-bold">Created At:</p>
              <p className="font-medium">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
            {/* {notification.sender && (
              <div className="flex space-x-3">
                <p className="text-lg font-bold">Sender:</p>
                <p className="font-medium">{notification.sender.name}</p>
              </div>
            )} */}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default View;
