import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/StudentHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name == "image") {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: files[0],
  //     }));
  //   } else {
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }
  // };
  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "department") {
      // fetch programs for selected department
      try {
        const res = await axios.get(
          `http://localhost:3000/api/department/${value}/programs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setPrograms(res.data.programs);
        }
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    }

    if (name === "image") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/student/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/students");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data?.error || "An error occurred on the server");
      } else if (error.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      {" "}
      <h2 className="text-2xl font-bold mb-6">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter  Name"
              name="name"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter  Email"
              name="email"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Student ID
            </label>
            <input
              type="text"
              placeholder=" Student ID"
              name="studentId"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              placeholder="DOB"
              name="dob"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>

            <select
              name="gender"
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="department"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            >
              <option value="">select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Program
            </label>
            <select
              name="program"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
              disabled={programs.length === 0}
            >
              <option value="">Select Program</option>
              {programs.map((prog) => (
                <option key={prog._id} value={prog._id}>
                  {prog.program_name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="*******"
              name="password"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrollment Year
            </label>

            <input
              type="text"
              placeholder="Enrollment Year"
              name="enrollmentYear"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Semester
            </label>

            <input
              type="text"
              placeholder="Semester"
              name="semester"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              placeholder="Upload Image"
              name="image"
              accept="image/*"
              className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default Add;
