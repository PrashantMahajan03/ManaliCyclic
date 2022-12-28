import { Tabs } from "antd";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { setUser } from "../redux/userSlice";

const Notifications = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const markAllAsSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/mark-all-notifications-as-seen",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  const deleteAllSeen = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/delete-all-seen-notifications",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1 className="heading-content">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="Unread" key="1">
          <div className="d-flex approvalbtn justify-content-end">
            <h1 className="anchor seenbtn" onClick={markAllAsSeen}>
              Mark All As Seen
            </h1>
          </div>
          <div className="tabscontent">
            {user?.unseenNotifications.map((notification) => (
              <div className="card notificationcard p-2">
                <div className="card-text">{notification.message}</div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key="2">
          <div className="d-flex justify-content-end">
            <h1 className="anchor seenbtn" onClick={deleteAllSeen}>
              Delete All
            </h1>
          </div>
          <div className="tabscontent">
            {user?.seenNotifications.map((notification) => (
              <div className="card notificationcard p-2">
                <div>{notification.message}</div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notifications;
