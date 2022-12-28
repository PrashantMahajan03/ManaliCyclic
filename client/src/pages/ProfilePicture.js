import { Avatar, Button, Card, Col, Form, Input, Row, Select } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { values } from "lodash";
import { UserOutlined } from "@ant-design/icons";
import picturelist from "./profilepicturelist";

const ProfilePicture = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [displayPicture, setDisplayPicture] = useState("");
  const [name, setName] = useState("");

  const [picture, setPicture] = useState("");
  const navigate = useNavigate();

  // const pictureHandler = (e) => {
  //   setPicture(e.target.value);
  //   console.log(e);
  // };

  // useEffect(() => {
  //   pictureHandler();
  // }, []);

  // const getProfilePicture = async () => {
  //   try {
  //     dispatch(showLoading());
  //     const response = await axios.get("/api/user/get-profile-picture", {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     });
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       setDisplayPicture(response.data.data);
  //       // console.log(response.data.data);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //   }
  // };

  // useEffect(() => {
  //   getProfilePicture();
  //   const pictureavailable = !!setDisplayPicture.length;

  //   // console.log(pictureavailable);
  //   // console.log(displayPicture);
  // }, []);

  const uploadpictureHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/upload-picture",
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
        navigate("/dashboard");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
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
        setDisplayPicture(response.data.data);
        // console.log(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getProfilePicture();
    const pictureavailable = !!setDisplayPicture.length;

    // console.log(pictureavailable);
    // console.log(displayPicture);
  }, []);

  const updatePictureHandler = async (values) => {
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
        getProfilePicture();
        // setDisplayPicture(response.data.data);
        navigate("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    const pictureavailable = !!setDisplayPicture.length;
  }, [displayPicture]);
  // const length = !pictureavailable.length;

  const nameFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/update-name",
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

  console.log(displayPicture);
  return (
    <Layout>
      <h1 className="heading-content">Profile</h1>
      <Row>
        <Col span={12}>
          {displayPicture &&
            displayPicture.map((picture, index) => (
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

          {displayPicture.length === 0 && (
            <Form onFinish={uploadpictureHandler}>
              <Form.Item
                className="imageselector"
                label="Select Your Profile Picture"
                name="image"
              >
                <Select id="image" className="pictureselector">
                  <Option value="-"></Option>
                  <Option value={picturelist[0].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[0].label}
                      src={picturelist[0].src}
                    />
                  </Option>
                  <Option value={picturelist[1].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[1].label}
                      src={picturelist[1].src}
                    />
                  </Option>
                  <Option value={picturelist[2].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[2].label}
                      src={picturelist[2].src}
                    />
                  </Option>
                  <Option value={picturelist[3].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[3].label}
                      src={picturelist[3].src}
                    />
                  </Option>
                  <Option value={picturelist[4].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[4].label}
                      src={picturelist[4].src}
                    />
                  </Option>
                  <Option value={picturelist[5].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[5].label}
                      src={picturelist[5].src}
                    />
                  </Option>
                  <Option value={picturelist[6].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[6].label}
                      src={picturelist[6].src}
                    />
                  </Option>
                  <Option value={picturelist[7].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[7].label}
                      src={picturelist[7].src}
                    />
                  </Option>
                  <Option value={picturelist[8].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[8].label}
                      src={picturelist[8].src}
                    />
                  </Option>
                  <Option value={picturelist[9].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[9].label}
                      src={picturelist[9].src}
                    />
                  </Option>
                  <Option value={picturelist[10].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[10].label}
                      src={picturelist[10].src}
                    />
                  </Option>
                  <Option value={picturelist[11].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[11].label}
                      src={picturelist[11].src}
                    />
                  </Option>
                  <Option value={picturelist[12].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[12].label}
                      src={picturelist[12].src}
                    />
                  </Option>
                  <Option value={picturelist[13].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[13].label}
                      src={picturelist[13].src}
                    />
                  </Option>
                  <Option value={picturelist[14].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[14].label}
                      src={picturelist[14].src}
                    />
                  </Option>
                  <Option value={picturelist[15].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[15].label}
                      src={picturelist[15].src}
                    />
                  </Option>
                  <Option value={picturelist[16].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[16].label}
                      src={picturelist[16].src}
                    />
                  </Option>
                  <Option value={picturelist[17].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[17].label}
                      src={picturelist[17].src}
                    />
                  </Option>
                  <Option value={picturelist[18].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[18].label}
                      src={picturelist[18].src}
                    />
                  </Option>
                </Select>
              </Form.Item>
              <Button className="setpicture" htmlType="submit">
                Set Profile Picture
              </Button>
            </Form>
          )}
          {displayPicture.length > 0 && (
            <Form onFinish={updatePictureHandler}>
              <Form.Item
                label="Select Your Profile Picture"
                className="imageselector"
                name="image"
              >
                <Select id="image" className="pictureselector">
                  <Option value="-"></Option>
                  <Option value={picturelist[0].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[0].label}
                      src={picturelist[0].src}
                    />
                  </Option>
                  <Option value={picturelist[1].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[1].label}
                      src={picturelist[1].src}
                    />
                  </Option>
                  <Option value={picturelist[2].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[2].label}
                      src={picturelist[2].src}
                    />
                  </Option>
                  <Option value={picturelist[3].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[3].label}
                      src={picturelist[3].src}
                    />
                  </Option>
                  <Option value={picturelist[4].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[4].label}
                      src={picturelist[4].src}
                    />
                  </Option>
                  <Option value={picturelist[5].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[5].label}
                      src={picturelist[5].src}
                    />
                  </Option>
                  <Option value={picturelist[6].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[6].label}
                      src={picturelist[6].src}
                    />
                  </Option>
                  <Option value={picturelist[7].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[7].label}
                      src={picturelist[7].src}
                    />
                  </Option>
                  <Option value={picturelist[8].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[8].label}
                      src={picturelist[8].src}
                    />
                  </Option>
                  <Option value={picturelist[9].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[9].label}
                      src={picturelist[9].src}
                    />
                  </Option>
                  <Option value={picturelist[10].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[10].label}
                      src={picturelist[10].src}
                    />
                  </Option>
                  <Option value={picturelist[11].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[11].label}
                      src={picturelist[11].src}
                    />
                  </Option>
                  <Option value={picturelist[12].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[12].label}
                      src={picturelist[12].src}
                    />
                  </Option>
                  <Option value={picturelist[13].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[13].label}
                      src={picturelist[13].src}
                    />
                  </Option>
                  <Option value={picturelist[14].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[14].label}
                      src={picturelist[14].src}
                    />
                  </Option>
                  <Option value={picturelist[15].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[15].label}
                      src={picturelist[15].src}
                    />
                  </Option>
                  <Option value={picturelist[16].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[16].label}
                      src={picturelist[16].src}
                    />
                  </Option>
                  <Option value={picturelist[17].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[17].label}
                      src={picturelist[17].src}
                    />
                  </Option>
                  <Option value={picturelist[18].src}>
                    {" "}
                    <img
                      width="50"
                      height="50"
                      alt={picturelist[18].label}
                      src={picturelist[18].src}
                    />
                  </Option>
                </Select>
              </Form.Item>
              <Button className="setpicture" htmlType="submit">
                Update Profile Picture
              </Button>
            </Form>
          )}
        </Col>
        <Col span={24}>
          <Form onFinish={nameFinishHandler}>
            <Form.Item name="name">
              <Input
                className="changenameinput"
                defaultValue={user.name}
                onChange={nameChangeHandler}
              />
            </Form.Item>
            <Button className="changenameinputbtn primary" htmlType="submit">
              Update Name
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default ProfilePicture;
