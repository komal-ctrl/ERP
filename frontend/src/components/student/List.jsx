import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { columns, StudentButtons } from "../../utils/StudentHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
const List = () => {
  const [students, setStudents] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  useEffect(() => {
    const fetchStudents = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/student", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.students.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            semester: emp?.semester || "N/A",
            dep_name: emp.department?.dep_name || "N/A",
            name: emp.userId?.name || "N/A",
            program: emp.program?.program_name || "N/A",
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:3000/${emp.userId?.profileImage}`}
              />
            ),
            action: <StudentButtons ID={emp._id} />,
          }));

          setStudents(data);
          setFilteredStudents(data);
        }
      } catch (error) {
        if (error.response) {
          alert(
            error.response.data?.error || "An error occurred on the server"
          );
        } else if (error.request) {
          alert("No response from server. Please check your connection.");
        } else {
          alert(`Error: ${error.message}`);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchStudents();
  }, []);
  const handleFilter = (e) => {
    const records = students.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredStudents(records);
  };
  return (
    <div className="p-6">
      {" "}
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Students</h3>
      </div>
      <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search By  Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-students"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Student
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredStudents} pagination />
      </div>
    </div>
  );
};

export default List;
