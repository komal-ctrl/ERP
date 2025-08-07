import React, { useEffect, useState } from "react";
import api from "../api"; // ✅ Correct way to import named export

const Profile = () => {
  const [user, setUser] = useState(null); // to hold fetched user data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile", {
          withCredentials: true, // include cookies if using sessions/JWT in cookies
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Profile not found</div>;
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-2xl font-bold border-b text-blue-700">
          user Panel
        </div>
        <ul className="p-4 space-y-4 text-gray-800">
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            Dashboard
          </li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            My Courses
          </li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            Attendance
          </li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            Results
          </li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            Fee Details
          </li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            Apply Leave
          </li>
          <li className="hover:bg-blue-100 rounded-md p-2 cursor-pointer">
            Notices
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">My user</h1>
        </header>

        <main className="p-6 flex-1 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start">
            {/* user Image */}
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-6 md:mb-0">
              <img
                src={
                  user.userId.profile?.image?.data
                    ? `data:${
                        user.userId.profile.image.contentType
                      };base64,${btoa(
                        new Uint8Array(
                          user.userId.profile.image.data.data
                        ).reduce(
                          (data, byte) => data + String.fromCharCode(byte),
                          ""
                        )
                      )}`
                    : "avatar_icon.png"
                }
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>

            {/* user Details */}
            <div className="md:ml-10 text-center md:text-left w-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {user.userId.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                user ID: {user.userId._id}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                role: {user.userId.role}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {user.userId.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span>{" "}
                  {user.userId.profile?.phone || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Course:</span>
                  {user?.course || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Department:</span>{" "}
                  {user?.department}
                </p>
                <p>
                  <span className="font-semibold">Year:</span>{" "}
                  {user?.enrollmentYear || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">DOB:</span>{" "}
                  {user.userId.profile.dob.substring(0, 10)}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {user.userId.profile.address}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
