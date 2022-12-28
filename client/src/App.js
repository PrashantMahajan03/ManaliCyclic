//jshint esversion:6
import React from "react";
import "antd/dist/antd.min.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Consultation from "./pages/Consultations";
import Notifications from "./pages/Notifications";
import UsersList from "./pages/Admin/usersList";
import ConsultationsList from "./pages/Admin/consutlationsList";
import AppointmentsList from "./pages/AppointmentsList";
import BlogPosts from "./pages/Admin/blogpost";
import ExploreCases from "./pages/ExploreCases";
import CaseDetail from "./pages/CaseDetail";
import Profile from "./pages/Profile";
import ProfilePicture from "./pages/ProfilePicture";
import ContactMe from "./pages/ContactMe";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.user);
  return (
    <section>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster
        toastOptions={{ className: "toasters" }}
        position="top-center"
        reverseOrder={false}
      />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              {" "}
              <Login />{" "}
            </PublicRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/explorecases" element={<ExploreCases />} />
        <Route path="/cases/:id" element={<CaseDetail />} />
        <Route path="/profile" element={<ProfilePicture />} />
        <Route path="/contact" element={<ContactMe />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {" "}
              <Dashboard />{" "}
            </ProtectedRoute>
          }
        />
        {user?.role === "user" && (
          <Route
            path="/consultations"
            element={
              <ProtectedRoute>
                {" "}
                <Consultation />{" "}
              </ProtectedRoute>
            }
          />
        )}
        {user?.role === "user" && (
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                {" "}
                <AppointmentsList />{" "}
              </ProtectedRoute>
            }
          />
        )}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              {" "}
              <Notifications />{" "}
            </ProtectedRoute>
          }
        />
        {user?.role === "admin" && (
          <Route
            path="/admin/userslist"
            element={
              <ProtectedRoute>
                {" "}
                <UsersList />{" "}
              </ProtectedRoute>
            }
          />
        )}
        {user?.role === "admin" && (
          <Route
            path="/admin/consultationslist"
            element={
              <ProtectedRoute>
                <ConsultationsList />
              </ProtectedRoute>
            }
          />
        )}
        {user?.role === "admin" && (
          <Route
            path="/admin/blogpost"
            element={
              <ProtectedRoute>
                {" "}
                <BlogPosts />{" "}
              </ProtectedRoute>
            }
          />
        )}
      </Routes>
    </section>
  );
}

export default App;
