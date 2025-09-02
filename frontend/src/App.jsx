import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/admin/AdminSummary";
import SummaryCard from "./components/studentDashboard/Summary";
import AddDepartment from "./components/departments/AddDepartment";
import EditDepartment from "./components/departments/EditDepartment";
import Table from "./components/leave/Table";
import Detail from "./components/leave/Detail";
import LeaveList from "./components/leave/LeaveList";
import DepartmentList from "./components/departments/List";
import StudentList from "./components/student/List";
import AddStudent from "./components/student/Add";
import View from "./components/student/View";
import EditStudent from "./components/student/Edit";
import AddProgram from "./components/Program/AddProgram";
import EditProgram from "./components/Program/Edit";
import ProgramList from "./components/Program/List";
import Setting from "./components/studentDashboard/Setting";
import AddLeave from "./components/leave/AddLeave";
import StudentDashboard from "./pages/StudentDashboard";
import NotificationList from "./components/notifications/NotificationList";
import AddNotification from "./components/notifications/AddNotification";
import ViewNotification from "./components/notifications/View";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                <AdminDashboard></AdminDashboard>
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>
          <Route
            path="/admin-dashboard/departments"
            element={<DepartmentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/department/:id"
            element={<EditDepartment />}
          ></Route>
          <Route
            path="/admin-dashboard/programs"
            element={<ProgramList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-Program"
            element={<AddProgram />}
          ></Route>
          <Route
            path="/admin-dashboard/program/:id"
            element={<EditProgram />}
          ></Route>
          <Route
            path="/admin-dashboard/students"
            element={<StudentList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-students"
            element={<AddStudent />}
          ></Route>
          <Route
            path="/admin-dashboard/students/:id"
            element={<View />}
          ></Route>
          <Route
            path="/admin-dashboard/students/edit/:id"
            element={<EditStudent />}
          ></Route>
          <Route
            path="/admin-dashboard/students/edit/:id"
            element={<EditStudent />}
          ></Route>
          <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
          <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
          <Route
            path="/admin-dashboard/leaves/:id"
            element={<Detail />}
          ></Route>
          <Route
            path="/admin-dashboard/students/leaves/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/admin-dashboard/notifications"
            element={<NotificationList />}
          ></Route>
          <Route
            path="/admin-dashboard/add-notification"
            element={<AddNotification />}
          ></Route>
          <Route
            path="/admin-dashboard/notifications/:id"
            element={<ViewNotification />}
          ></Route>
        </Route>
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["student"]}>
                <StudentDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<SummaryCard />}></Route>
          <Route
            path="/student-dashboard/profile/:id"
            element={<View />}
          ></Route>
          <Route
            path="/student-dashboard/leaves/:id"
            element={<LeaveList />}
          ></Route>
          <Route
            path="/student-dashboard/add-leave"
            element={<AddLeave />}
          ></Route>

          <Route
            path="/student-dashboard/setting"
            element={<Setting />}
          ></Route>
          <Route
            path="/student-dashboard/notifications"
            element={<NotificationList />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
