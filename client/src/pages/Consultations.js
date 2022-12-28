import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
} from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Picker from "../Calendar/DateTimePicker";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckAvailabilityIcon from "../Images/6409057_calendar_date_event_schedule_icon.png";
import BookNowIcon from "../Images/4082902_appointment_booking_calendar_event_plan_icon.png";

const Consultation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [selectedTimings, setSelectedTimings] = useState();
  const [unavailableDates, setUnavailableDates] = useState();
  const navigate = useNavigate();
  const finishHandler = async (values) => {
    setIsAvailable(false);
    console.log(values);
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/consultations",
        {
          ...values,
          userId: user._id,
          date: date,
          timings: selectedTimings,
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
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  const checkAvailability = async () => {
    try {
      dispatch(showLoading());

      const resAvail = await axios.post(
        "/api/user/check-availability",
        {
          date: date,
          timings: selectedTimings,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resAvail.data.success) {
        setIsAvailable(true);
        toast.success(resAvail.data.message);
      } else {
        toast.error(resAvail.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  const getDateData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-dates", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setUnavailableDates(response.data.data);
        console.log(response.data.data);
        console.log(setUnavailableDates);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getDateData();
  }, []);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  return (
    <Layout>
      <h1 className="heading-content-consultation">Consultation</h1>
      <h5 className="consultationfeeinfo">
        *First Consultation is Free of Charge! Pricing for further consultations
        will be tailored based on the case*
      </h5>
      <Form onFinish={finishHandler}>
        <Row>
          <Col>
            <Form.Item name="name">
              <Input className="consultationinput" placeholder="Name" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item className="consultationinputtitle" name="title">
              <Select className="consultationinputtitle" placeholder="Title">
                <Option value="-"></Option>
                <Option value="Student"></Option>
                <Option value="Patient"></Option>
                <Option value="Doctor"></Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Item className="consultationinputcategory" name="type">
              <Select
                className="consultationinputcategory"
                placeholder="Consultation Category"
              >
                <Option value="-"></Option>
                <Option value="Patient Consultation"></Option>
                <Option value="Research Paper Review"></Option>
                <Option value="Theory Topic Consultation"></Option>
                <Option value="Lab Consultation"></Option>
                <Option value="Exam Consultation"></Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item name="description">
              <Input
                className="consultationdescription"
                placeholder="Description"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex flex-column">
              <DatePicker
                name="date"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
                disabledDate={disabledDate}
                className="consultationdt consultationdate"
              />
              <TimePicker
                name="timings"
                format="HH:mm"
                onChange={(values) => {
                  setIsAvailable(false);
                  setSelectedTimings(moment(values).format("HH:mm"));
                }}
                className="consultationdt consultationtime"
              />
            </div>
          </Col>
        </Row>
        {isAvailable && (
          <Button className="consultationbooknow primary" htmlType="submit">
            <img
              className="consultationbookicon"
              alt="booknowicon"
              src={BookNowIcon}
            />
            Book Now
          </Button>
        )}
      </Form>
      <Button
        className="btn-register primary"
        htmlType="submit"
        onClick={checkAvailability}
        className="consultaitoncheckavailability"
      >
        <img
          className="consultationicon"
          alt="checkavailability"
          src={CheckAvailabilityIcon}
        />
        Check Availability
      </Button>
    </Layout>
  );
};

export default Consultation;
