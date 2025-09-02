import React, { useEffect, useState } from "react";
import axios from "axios";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import DataTable from "react-data-table-component";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          studentId: leave.studentId.studentId,
          leaveType: leave.leaveType,
          department: leave.studentId.department.dep_name,
          name: leave.studentId.userId.name,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
        }));

        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };
  const filterByButton = (s) => {
    const data = leaves.filter((leave) => leave.status === s);
    setFilteredLeaves(data);
  };
  return (
    <>
      {filteredLeaves ? (
        <div className="p-5">
          {" "}
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leave</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By  Student Id"
              className="px-4 py-0.5 border"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-2 bg-teal-600 text-white hover:bg-teal-700 py-1"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 bg-teal-600 text-white hover:bg-teal- py-1"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>
          <DataTable
            className="mt-6"
            columns={columns}
            data={filteredLeaves}
            pagination
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Table;
