import React, { useEffect, useRef } from "react";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/studentDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure styles are imported
import { useAuth } from "../Context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();
  const shownToast = useRef(false); // to prevent duplicate toasts

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/notifications/${user.role}`
        );
        if (
          !shownToast.current &&
          res.data.success &&
          res.data.notifications.length > 0
        ) {
          shownToast.current = true; // mark as shown
          const latest = res.data.notifications[0];
          toast.info(`${latest.title}: ${latest.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            style: { fontSize: "1.1rem", padding: "16px" }, // larger toast
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [user.role]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
        <ToastContainer />
      </div>
    </div>
  );
};

export default StudentDashboard;
