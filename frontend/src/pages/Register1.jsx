import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api"; // use the configured axios
import bgImage from "../assets/bg1.jpg";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    gender: "",
    dob: "",
    phone: "",
    department: "",
    enrollmentYear: "",
    address: "",
    course: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/users/register", form);

      toast.success("Registration successful!");

      setTimeout(() => {
        if (res.data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (res.data.role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-dashboard");
        }
      }, 2000);
    } catch (err) {
      toast.error(
        "Registration failed: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Register
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-md"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
        </select>

        <select
          name="gender"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="date"
          name="dob"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <input
          type="text"
          name="course"
          placeholder="Course"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="text"
          name="enrollmentYear"
          placeholder="Enrollment Year"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />
        <input
          type="file"
          name="image"
          placeholder="Image"
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default Register;
