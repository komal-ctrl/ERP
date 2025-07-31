import React from "react";

const StudentProfile = ({ student }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold border-b text-blue-700">
          Student Panel
        </div>
        <ul className="p-4 space-y-4 text-gray-800">
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Dashboard</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">My Courses</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Attendance</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Results</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Fee Details</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Apply Leave</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Notices</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">My Profile</h1>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start">
            {/* Profile Image */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-6 md:mb-0">
              <img
                src={student.photoUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Details */}
            <div className="md:ml-10 text-center md:text-left w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{student.name}</h2>
              <p className="text-sm text-gray-600 mb-4">Student ID: {student.studentId}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <p><span className="font-semibold">Email:</span> {student.email}</p>
                <p><span className="font-semibold">Phone:</span> {student.phone}</p>
                <p><span className="font-semibold">Course:</span> {student.course}</p>
                <p><span className="font-semibold">Department:</span> {student.department}</p>
                <p><span className="font-semibold">Year:</span> {student.year}</p>
                <p><span className="font-semibold">DOB:</span> {student.dob}</p>
                <p><span className="font-semibold">Address:</span> {student.address}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;
