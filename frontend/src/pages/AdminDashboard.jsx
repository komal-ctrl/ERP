import React from "react";
import { useAuth } from "../Context/AuthContext";
import AdminSidebar from "../components/admin/AdminSidebar";
import Navbar from "../components/admin/Navbar";
import AdminSummary from "../components/admin/AdminSummary";
import { Outlet } from "react-router-dom";
const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <AdminSidebar></AdminSidebar>{" "}
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminDashboard;
