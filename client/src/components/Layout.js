import React, { useEffect, useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Badge, Card } from "antd";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import axios from "axios";
import Meta from "antd/lib/card/Meta";
import { setUser } from "../redux/userSlice";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(true);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [profilepicture, setProfilePicture] = useState();

  const userMenu = [
    {
      name: "Home",
      path: "/dashboard",
      icon: "ri-dashboard-fill",
    },
    {
      name: "Consultation",
      path: "/consultations",
      icon: "ri-folder-open-fill",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-2-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/dashboard",
      icon: "ri-dashboard-fill",
    },
    {
      name: "Users",
      path: "/admin/userslist",
      icon: "ri-file-user-fill",
    },

    {
      name: "Consultations",
      path: "/admin/consultationslist",
      icon: "ri-hospital-fill",
    },
    {
      name: "Blogs",
      path: "/admin/blogpost",
      icon: "ri-git-repository-commits-line",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "ri-profile-fill",
    },
  ];

  const menuToBeRendered = user?.role === "admin" ? adminMenu : userMenu;

  const getProfilePicture = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-profile-picture", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setProfilePicture(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getProfilePicture();
  }, []);

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <h1 className="layouttitle">
            <Link className="layouttitle" to="/">
              Dr. Manali Somani
            </Link>
          </h1>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && `active-menu-item`
                  }`}
                >
                  <i className={`sidebaricons ${menu.icon}`}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                dispatch(setUser(undefined, null));

                navigate("/login");
              }}
            >
              <i className="sidebaricons ri-logout-box-fill"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
              <Badge
                className="badgenotification"
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-fill header-action-icon px-3"></i>
              </Badge>
              {profilepicture &&
                profilepicture.map((picture, index) => (
                  <Card
                    className="layoutprofilepicturecard"
                    cover={
                      <img
                        className="layoutprofilepicture"
                        alt={user.name}
                        src={picture.image}
                      />
                    }
                  >
                    <Meta image={<Avatar src={picture.image} />} />
                  </Card>
                ))}

              <Link className="anchor username" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
