import { Avatar, Button, Card, Col, Form, Input, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { values } from "lodash";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [fileData, setFileData] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilepicture, setProfilePicture] = useState();
  //   const [profile, setProfile] = useState("");
  const navigate = useNavigate();

  const finishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/update-profile",
        {
          ...values,
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
        setName(response.data.name);
        setEmail(response.data.email);
        navigate("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const uploadProfilePicHandler = async () => {
    try {
      dispatch(showLoading());
      const data = new FormData();
      data.append("profilepic", fileData);
      data.append("userId", user._id);
      const response = await axios.post("/api/user/add-profile-picture", data);
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

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };
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

  const updateProfilePicHandler = async () => {
    try {
      dispatch(showLoading());
      const data = new FormData();
      data.append("profilepic", fileData);
      data.append("userId", user._id);

      const response = await axios.post(
        "/api/user/update-profile-picture",
        data
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

  return (
    <Layout>
      <h1 className="heading-content">Profile</h1>
      <Row>
        <Col className="uploadcolumn">
          {profilepicture &&
            profilepicture.map((picture, index) => (
              <Card
                className="profilepicturecard"
                cover={
                  <img
                    className="profilepicture"
                    alt={user.name}
                    src={picture.image}
                  />
                }
              >
                <Meta image={<Avatar src={picture.image} />} />
              </Card>
            ))}
          <Form onFinish={uploadProfilePicHandler}>
            <Form.Item>
              <Input
                className="blogimageinput"
                type="file"
                onChange={fileChangeHandler}
              />
            </Form.Item>
            <Button
              className="btn-register primary uploadpicture"
              htmlType="submit"
            >
              Upload Picture
            </Button>
          </Form>
        </Col>
        <Col>
          <Form onFinish={finishHandler}>
            <Row>
              <Col span={8} className="updateprofile">
                <Form.Item name="name">
                  <Input
                    className="consultationinput"
                    defaultValue={user.name}
                    onChange={nameChangeHandler}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item name="email">
                  <Input
                    className="consultationinput"
                    defaultValue={user.email}
                    onChange={emailChangeHandler}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button className="btn-register primary" htmlType="submit">
              Update Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
