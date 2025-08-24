import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { fetchDepartments } from "../../utils/StudentHelper";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const [program, setProgram] = useState({
    program_name: "",

    description: "",

    department: "",
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const [depLoading, setDepLoading] = useState(false);
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
  useEffect(() => {
    const fetchPrograms = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/department/programs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const program = response.data.program;
          setProgram((prev) => ({
            ...prev,
            program_name: program.program_name,

            description: program.description,

            department: program.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };
    fetchPrograms();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/api/department/programs/${id}`,
        {
          program_name: program.program_name,
          description: program.description,
          department: program.department,
        },
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
    <>
      {depLoading ? (
        <div>Loading</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <div className="text-2xl font-bold mb-6">
            <h3>Edit Program</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="program_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Program Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Dep Name"
                  name="program_name"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={program.program_name}
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
                  value={program.description}
                ></textarea>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                  onChange={handleChange}
                  value={program.department}
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
              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Program
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Edit;
