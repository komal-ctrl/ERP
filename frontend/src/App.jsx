import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AdminProfile from "./pages/AdminProfile";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import StudentProfile from "./pages/StudentProfile";
import Profile from "./pages/Profile";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* <Route
          path="/student-profile"
          element={<StudentProfile student={studentData} />}
        /> */}
        <Route path="/profile" element={<Profile />} />
        {/* <Route
          path="/admin-profile"
          element={<AdminProfile admin={adminData} />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
