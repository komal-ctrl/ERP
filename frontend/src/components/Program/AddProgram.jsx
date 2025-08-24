import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utils/StudentHelper";
const AddProgram = () => {
  const [departments, setDepartments] = useState([]);

  const [program, setProgram] = useState({
    department: "",
    program_name: "",
    description: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { department, program_name, description } = program;
      const response = await axios.post(
        `http://localhost:3000/api/department/${program.department}/programs`,
        { program_name, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/programs");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div className="text-2xl font-bold mb-6">
        <h3>Add Program</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-gray-700">
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
            <label
              htmlFor="program_name"
              className="text-sm font-medium text-gray-700"
            >
              Program Name
            </label>
            <input
              type="text"
              placeholder="Enter Program Name"
              name="program_name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Description"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
              onChange={handleChange}
              rows={4}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Program
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProgram;
