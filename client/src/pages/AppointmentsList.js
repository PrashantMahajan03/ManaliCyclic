import { Table } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment from "moment";
import { setUser } from "../redux/userSlice";
import { get } from "lodash";

const AppointmentsList = () => {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-appointments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  }, []);
  useEffect(() => {
    const data = window.localStorage.getItem("appointmentlist");
    const saveddata = JSON.parse(data);
    setAppointments(saveddata);
    getAppointmentsData();
  }, []);
  useEffect(() => {
    const appointmentData = window.localStorage.setItem(
      "appointmentlist",
      JSON.stringify(appointments)
    );
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "timings",
    },
  ];

  return (
    <Layout>
      <h1 className="heading-content">Appointments List</h1>
      <Table
        columns={columns}
        pagination={{
          pageSize: 100000,
        }}
        dataSource={appointments}
      />
    </Layout>
  );
};

export default AppointmentsList;
