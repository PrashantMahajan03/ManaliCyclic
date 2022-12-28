import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const ConsultationsList = () => {
  const [consultations, setConsultations] = useState([]);
  const dispatch = useDispatch();
  const getConsultationData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-consultations", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setConsultations(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-consultation-status",
        { consultationId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getConsultationData();
      }
    } catch (error) {
      toast.error("Error Changing Status");

      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getConsultationData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex approvalbtn">
          {/* {record.status === "Pending" && ( */}
          <h1
            className="anchor"
            onClick={() => changeStatus(record, "Approved")}
          >
            Accept{" "}
          </h1>
          {/* )} */}
          {/* {record.status === "Approved" && ( */}
          <span className="slash"> /</span>
          <h1
            className="anchor"
            onClick={() => changeStatus(record, "Declined")}
          >
            Decline
          </h1>
          {/* )} */}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="heading-content">Consultations List</h1>
      <Table
        columns={columns}
        pagination={{
          pageSize: 100000,
        }}
        dataSource={consultations}
      />
    </Layout>
  );
};

export default ConsultationsList;
