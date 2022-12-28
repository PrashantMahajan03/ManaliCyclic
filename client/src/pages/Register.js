import React, { useState } from "react";
import NavBar from "../NavBar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Form, Input, Button } from "antd";
// import Calendar from "../Calendar/Calendar";
// import {useLocale} from 'react-aria';
// import { DatePicker } from "../ChakraCalendar/DatePicker";
// import { today, now, getLocalTimeZone } from "@internationalized/date";
// import { OverlayContainer } from "@react-aria/overlays";
// import { ChakraProvider, Box, Heading } from "@chakra-ui/react";
import Picker from "../Calendar/DateTimePicker";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import Footer from "../Footer";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordHandler = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="authentication">
      <NavBar />
      <div className="registerrow">
        <div className="registercard card p-3">
          <h1 className=" appointmenttext card-title">
            Book Your
            <span> Appointment </span>
            Now!
          </h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name">
              <Input className="registerholders" placeholder="Full Name" />
            </Form.Item>
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
            <Button className="btn-register primary" htmlType="submit">
              Register
            </Button>
            <Link to="/login" className="loginlink anchor mt-2">
              Already Registered? Login Here!
            </Link>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
