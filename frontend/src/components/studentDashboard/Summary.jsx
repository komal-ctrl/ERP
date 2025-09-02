// import React from "react";

// const SummaryCard = () => {
//   const { user } = useAuth();
//   return (
//     <div className="p-6">
//       <div className="rounded  flex bg-white">
//         <div
//           className={`text-3xl flex justify-center items-center  bg-teal-600 text-white px-4`}
//         >
//           <FaUser></FaUser>
//         </div>
//         <div className="pl-4 py-1">
//           <p className="text-lg font-semibold">Welcome Back</p>
//           <p className="text-xl font-bold">{user.name}</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default SummaryCard;

import React from "react";
import SummaryCard from "../admin/SummaryCard";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../Context/AuthContext";
import {
  FaBuilding,
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaTimesCircle,
  FaUsers,
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <SummaryCard
          icon={<FaUsers />}
          text={"Attandance"}
          number={"13%"}
          color={"bg-teal-600"}
        />
        <SummaryCard
          icon={<FaUsers />}
          text={"CGPA"}
          number={7.8}
          color={"bg-teal-600"}
        />
        <SummaryCard
          icon={<FaBuilding />}
          text={"Time Table highlights"}
          // number={5}
          color={"bg-yellow-600"}
        />
        <SummaryCard
          icon={<FaBuilding />}
          text={"Alerts"}
          number={5}
          color={"bg-yellow-600"}
        />
        <SummaryCard
          icon={<FaBuilding />}
          text={"Active Courses"}
          number={5}
          color={"bg-yellow-600"}
        />
        <SummaryCard
          icon={<FaBuilding />}
          text={"Exam Schedule"}
          // number={15}
          color={"bg-yellow-600"}
        />
        {/* <SummaryCard
          icon={<FaBuilding />}
          text={"Exam Schedule"}
          // number={15}
          color={"bg-yellow-600"}
        /> */}
        {/* <SummaryCard
          icon={<FaMoneyBillWave />}
          text={"Monthly Salary"}
          number={"$654"}
          color={"bg-red-600"}
        /> */}
      </div>
      {/* <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<FaFileAlt />}
            text={"Leave Applied"}
            number={5}
            color={"bg-red-600"}
          />
          <SummaryCard
            icon={<FaCheckCircle />}
            text={"Leave Approved"}
            number={2}
            color={"bg-green-600"}
          />
          <SummaryCard
            icon={<FaHourglassHalf />}
            text={"Leave Pending"}
            number={4}
            color={"bg-yellow-600"}
          />
          <SummaryCard
            icon={<FaTimesCircle />}
            text={"Leave Rejected"}
            number={1}
            color={"bg-red-600"}
          />
        </div>
      </div> */}
    </div>
  );
};

export default AdminSummary;
