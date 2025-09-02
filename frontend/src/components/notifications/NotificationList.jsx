import React from "react";
import { Link, useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import DataTable from "react-data-table-component";
import { column, NotificationButtons } from "../../utils/NotificationHelper";
// import { NotificationButtons } from "../../utils/NotificationHelper";

const NotificationList = () => {
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const onNotificationDelete = () => {
    fetchNotification();
  };
  // let sno = 1;
  // const { id } = useParams();
  const { user } = useAuth();
  const fetchNotification = async () => {
    setNotifLoading(true);
    try {
      const url =
        user.role == "admin"
          ? `http://localhost:3000/api/notifications/all`
          : `http://localhost:3000/api/notifications/${user.role}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;
        const data = await response.data.notifications.map((notif) => ({
          _id: notif._id,
          sno: sno++,
          title: notif.title,
          type: notif.type,
          priority: notif.priority,
          action: (
            <NotificationButtons
              Id={notif._id}
              role={user.role}
              onNotificationDelete={onNotificationDelete}
            />
          ),
        }));
        setNotifications(data);
        setFilteredNotifications(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    } finally {
      setNotifLoading(false);
    }
  };
  useEffect(() => {
    fetchNotification();
  }, []);
  const filterNotifications = (e) => {
    const records = notifications.filter((notif) =>
      notif.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredNotifications(records);
  };

  return (
    <>
      {notifLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="p-5">
          {" "}
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Notifications</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Search By  Name"
              className="px-4 py-0.5 border"
              onChange={filterNotifications}
            />
            {user.role === "admin" && (
              <Link
                to="/admin-dashboard/add-notification"
                className="px-4 py-1 bg-teal-600 rounded text-white"
              >
                Send New Notification
              </Link>
            )}
          </div>
          <div className="mt-5">
            <DataTable
              columns={column}
              data={filteredNotifications}
              pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationList;
