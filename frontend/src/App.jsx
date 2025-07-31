import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminProfile from "./pages/AdminProfile";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentProfile from "./pages/StudentProfile"; 

import "./App.css";

const studentData = {
  name: "Rishika Rohila",
  studentId: "GEHU2025MCA045",
  email: "rishika@gmail.com",
  phone: "9876543210",
  course: "Master of Computer Applications",
  department: "Computer Science",
  year: "2nd Year",
  dob: "2002-08-15",
  address: "Dehradun, Uttarakhand",
  photoUrl: "avatar_icon.png",
};

const adminData = {
  name: "Aarav Sharma",
  adminId: "ADM1025",
  email: "aarav@gmail.com",
  phone: "9876543210",
  role: "System Administrator",
  department: "Computer Science",
  dob: "1985-06-15",
  address: "Dehradun, Uttarakhand",
  photoUrl: "avatar_icon.png", 
};

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route
          path="/student-profile"
          element={<StudentProfile student={studentData} />}
        />
        <Route path="/admin-profile" element={<AdminProfile admin={adminData} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
