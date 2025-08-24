import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { column, ProgramButtons } from "../../utils/ProgramHelper";
import axios from "axios";
import { useState } from "react";
const List = () => {
  const [progLoading, setProgLoading] = useState(false);
  const [programs, setProgram] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const onProgramDelete = () => {
    fetchPrograms();
  };
  const fetchPrograms = async () => {
    setProgLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:3000/api/department/programs",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.programs.map((progm) => ({
          _id: progm._id,
          sno: sno++,
          program_name: progm.program_name,
          department: progm.department.dep_name,
          action: (
            <ProgramButtons _id={progm._id} onProgramDelete={onProgramDelete} />
          ),
        }));
        setProgram(data);
        setFilteredPrograms(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setProgLoading(false);
    }
  };
  useEffect(() => {
    fetchPrograms();
  }, []);
  const filterPrograms = (e) => {
    const records = programs.filter((progm) =>
      progm.program_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredPrograms(records);
  };
  return (
    <>
      {progLoading ? (
        <div>Loading ....</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Programs</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              name=" "
              id=""
              placeholder="Search By Dep Name"
              className="px-4 py-0.5 border"
              onChange={filterPrograms}
            />
            <Link
              to="/admin-dashboard/add-program"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Program
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={column} data={filteredPrograms} pagination />
          </div>
        </div>
      )}
    </>
  );
};

export default List;
