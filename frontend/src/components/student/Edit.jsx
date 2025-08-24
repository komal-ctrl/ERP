import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/StudentHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const [student, setStudent] = useState({
    name: "",

    dob: "",
    gender: "",
    department: "",
    program: "",
    enrollmentYear: "",
  });
  const [departments, setDepartments] = useState([]);
  const [programs, setPrograms] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);
  // useEffect(() => {
  //   const fetchEmployee = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:3000/api/student/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.data.success) {
  //         const student = response.data.student;
  //         setStudent((prev) => ({
  //           ...prev,
  //           name: student.userId.name,
  //           studentId: student.studentId,
  //           dob: student.dob,
  //           gender: student.gender,
  //           enrollmentYear: student.enrollmentYear,
  //           department: student.department.dep_name._id,
  //           program: student.program.program_name._id,
  //         }));
  //       }
  //     } catch (error) {
  //       if (error.response && !error.response.data.success) {
  //         alert(error.response.data.error);
  //       }
  //     }
  //   };
  //   fetchEmployee();
  // }, []);
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const formatDate = (isoDate) => {
          if (!isoDate) return "";
          return new Date(isoDate).toISOString().split("T")[0]; // "2025-08-11"
        };
        const response = await axios.get(
          `http://localhost:3000/api/student/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const student = response.data.student;

          // preload programs for student's department
          const progRes = await axios.get(
            `http://localhost:3000/api/department/${student.department._id}/programs`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (progRes.data.success) {
            setPrograms(progRes.data.programs);
          }

          setStudent((prev) => ({
            ...prev,
            name: student.userId.name,
            studentId: student.studentId,
            semester: student.semester,
            dob: formatDate(student.dob),
            gender: student.gender,
            enrollmentYear: student.enrollmentYear,
            department: student.department._id, // use ID
            program: student.program._id, // use ID
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;
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
    setStudent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3000/api/student/${id}`,
        student,
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
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  return (
    <>
      {student && departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          {" "}
          <h2 className="text-2xl font-bold mb-6">Update Student</h2>
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
                  value={student.name}
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
                  value={student.dob}
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
                  value={student.gender}
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
                  value={student.department}
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
                  value={student.program}
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
                  Semester
                </label>

                <input
                  type="text"
                  placeholder="Semester"
                  name="semester"
                  className="mt-1 w-full p-2 block border border-gray-300 rounded-md"
                  value={student.semester}
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
                  value={student.enrollmentYear}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Student
            </button>
          </form>
        </div>
      ) : (
        <div>Loading ....</div>
      )}
    </>
  );
};

export default Edit;
