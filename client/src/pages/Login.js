//jshint esversion:6
import React, { useState } from "react";
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Form, Input, Button } from "antd";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import Footer from "../Footer";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());

      toast.error("Something Went Wrong");
    }
  };

  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="authentication">
      <NavBar />
      <div className="registerrow">
        <div className="registercard card p-3">
          <h1 className=" appointmenttext card-title">
            Login to your
            <span> Portal!</span>
          </h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="email">
              <Input className="registerholders" placeholder="E-Mail" />
            </Form.Item>
            <Form.Item name="password">
              <Input
                className="registerholders"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
              />
            </Form.Item>
            <Button className="showpassword" onClick={showPasswordHandler}>
              Show Password
            </Button>
            <Button className="primary btn-login" htmlType="submit">
              Login
            </Button>
            <Link to="/register" className="registerlink anchor mt-2">
              Click Here to Register!
            </Link>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
