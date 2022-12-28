import React, { useEffect, useState, useHistory } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { Card, Col, Row } from "antd";
import picturelist from "./profilepicturelist";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import moment, { format } from "moment";

function Dashboard() {
  const dispatch = useDispatch();
  const [latestAppointment, setLatestAppointments] = useState("");
  // const getData = async () => {
  //   try {
  //     const response = await axios.post(
  //       "/api/user/get-user-info-by-id",
  //       {},
  //       {
  //         headers: {
  //           Authorization: "Bearer " + localStorage.getItem("token"),
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-latest-appointment", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setLatestAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAppointmentsData();
  }, [setLatestAppointments]);

  // const appointmentDate = latestAppointment.date.toLocalDateString();

  return (
    <Layout>
      <h1 className="heading-content">Dashboard</h1>
      <h5 className="heading-content">Upcoming Appointments: </h5>
      <Row>
        <Col span={12}>
          <img
            className="manaliprofilepicture"
            alt="Manali"
            src="https://firebasestorage.googleapis.com/v0/b/image-upload-28244.appspot.com/o/avatar%2Favatar4.png?alt=media&token=3f178953-c78f-49d6-9921-0354d803f58d"
          />
        </Col>
        <Col span={12}>
          <Card className="latestappointmentcard" style={{ width: 400 }}>
            <h3>Appointment Details</h3>
            {/* {latestAppointment.length === 0 && (
              <h5>You Have No Upcoming Appointments</h5>
            )} */}
            {latestAppointment &&
              latestAppointment.map((appointment, index) => (
                <div>
                  <h5>Your Title:{appointment.type}</h5>
                  <h5>Description: {appointment.description}</h5>
                  <h5>On: {new Date(appointment.date).toLocaleDateString()}</h5>
                  <h5>At: {moment(appointment.timings).format("HH:mm")}</h5>
                </div>
              ))}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
}

export default Dashboard;
