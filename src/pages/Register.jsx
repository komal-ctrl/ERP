import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgImage from '../assets/bg1.jpg';


function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // default
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/register", form);
      toast.success('Registration successful!');
     setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      toast.error('Registration failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100" style={{backgroundImage:`url(${bgImage})`}}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        />

        <select
          name="role"
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="cursor-pointer w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
