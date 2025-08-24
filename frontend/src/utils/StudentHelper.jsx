import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },

  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "90px",
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    sortable: true,

    width: "120px",
  },
  {
    name: "Program",
    selector: (row) => row.program,
    width: "130px",
  },
  {
    name: "Semester",
    selector: (row) => row.semester,
    width: "130px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: true,
  },
];
export const fetchDepartments = async () => {
  let departments;
  try {
    const response = await axios.get("http://localhost:3000/api/department", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments;
};
// employees for Salary Form
// export const fetchEmployees = async (id) => {
//   let employees;
//   try {
//     const response = await axios.get(
//       `http://localhost:3000/api/employee/department/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     if (response.data.success) {
//       employees = response.data.employees;
//     }
//   } catch (error) {
//     if (error.response && !error.response.data.success) {
//       alert(error.response.data.error);
//     }
//   }
//   return employees;
// };
export const StudentButtons = ({ ID }) => {
  const navigate = useNavigate();
  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-4 py-1 bg-teal-600 "
        onClick={() => {
          navigate(`/admin-dashboard/students/${ID}`);
        }}
      >
        View
      </button>
      <button
        className="px-4 py-1 bg-blue-600"
        onClick={() => {
          navigate(`/admin-dashboard/students/edit/${ID}`);
        }}
      >
        Edit
      </button>
      {/* <button
        className="px-4 py-1 bg-yellow-600"
        onClick={() => {
          navigate(`/admin-dashboard/employees/salary/${ID}`);
        }}
      >
        Salary
      </button> */}
      {/* <button
        className="px-4 py-1 bg-red-600"
        onClick={() => {
          navigate(`/admin-dashboard/employees/leaves/${ID}`);
        }}
      >
        Leave
      </button> */}
    </div>
  );
};
