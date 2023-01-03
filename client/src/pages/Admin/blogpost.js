import { Button, Col, Form, Input, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { hideLoading, showLoading } from "../../redux/alertsSlice";

const BlogPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileData, setFileData] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const finishHandler = async () => {
    try {
      dispatch(showLoading());
      const data = new FormData();
      data.append("pic", fileData);
      data.append("title", title);
      data.append("description", description);
      const response = await axios.post("/api/admin/add-blogs", data);
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

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  return (
    <Layout>
      <h1 className="heading-content">Blogs</h1>
      <Form onFinish={finishHandler}>
        <Row>
          <Col span={12}>
            <Form.Item name="title">
              <Input
                className="blogtitleinput"
                placeholder="Enter the Blog Title"
                value={title}
                onChange={titleChangeHandler}
              />
            </Form.Item>
            <Form.Item name="description">
              <Input
                className="blogdescriptioninput"
                placeholder="Enter the Blog Description"
                value={description}
                onChange={descriptionChangeHandler}
              />
            </Form.Item>
            <Form.Item>
              <Input
                className="blogimageinput"
                placeholder="Select the Image"
                type="file"
                onChange={fileChangeHandler}
                multiple="true"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button className="bloguploadbtn" htmlType="submit">
              <img
                className="uploadimage"
                alt="upload"
                src={
                  "https://firebasestorage.googleapis.com/v0/b/image-upload-28244.appspot.com/o/uploadicon%2F7869470_download_man_upload_transfer_document_icon.png?alt=media&token=53678d11-f137-4e1d-ac3d-5483d6550fd0"
                }
              />
              <img
                className="uploadiconmobile"
                alt="uploadmobile"
                src={
                  "https://firebasestorage.googleapis.com/v0/b/image-upload-28244.appspot.com/o/uploadicon%2Fuploadicon.png?alt=media&token=0c429d73-eabc-4e56-b4f2-c2480cdce90b"
                }
                style={{ display: "none" }}
              />
            </Button>
          </Col>
        </Row>
      </Form>
    </Layout>
  );
};

export default BlogPosts;
