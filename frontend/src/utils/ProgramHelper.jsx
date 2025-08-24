import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const column = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Program Name",
    selector: (row) => row.program_name,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const ProgramButtons = ({ _id, onProgramDelete }) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you Want to Delete");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/department/programs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onProgramDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };
  return (
    <div className="flex space-x-3 text-white">
      <button
        className="px-4 py-1 bg-teal-600 "
        onClick={() => {
          navigate(`/admin-dashboard/program/${_id}`);
        }}
      >
        Edit
      </button>
      <button
        className="px-4 py-1 bg-red-600"
        onClick={() => handleDelete(_id)}
      >
        Delete
      </button>
    </div>
  );
};
