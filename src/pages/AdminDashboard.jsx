import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">

  
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold border-b text-blue-700">College ERP</div>
        <ul className="p-4 space-y-4 text-gray-800">
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Dashboard</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Students</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Faculty</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Courses</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Attendance</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Results</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Fee Management</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Leaves</li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">Notices</li>
        </ul>
      </div>

      <div className="flex-1 flex flex-col">
        
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Welcome, Admin</h1>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
        </header>

        
        <main className="p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-lg font-semibold">Total Students</h2>
              <p className="text-3xl font-bold text-blue-600">950</p>
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-lg font-semibold">Total Faculty</h2>
              <p className="text-3xl font-bold text-purple-600">120</p>
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-lg font-semibold">Active Courses</h2>
              <p className="text-3xl font-bold text-green-600">35</p>
            </div>

            <div className="bg-white p-4 shadow rounded-xl">
              <h2 className="text-lg font-semibold">Pending Leaves</h2>
              <p className="text-3xl font-bold text-yellow-600">6</p>
            </div>

          </div>

          
          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Notices</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Mid-Term Exams start from 10th Aug</li>
              <li>Fee submission deadline: 15th Aug</li>
              <li>Workshop on AI & ML: Register by 8th Aug</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
