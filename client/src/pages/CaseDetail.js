import React, { useEffect, useState } from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import Case from "./Case";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
const { Meta } = Card;

function CaseDetail() {
  const navigate = useNavigate();
  const params = useParams();

  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [image, setImage] = useState("");

  const [blogs, setBlogs] = useState();

  const { id } = params;
  const dispatch = useDispatch();
  //   const fetchDetails = async () => {
  //     const res = await axios
  //       .get(`/api/user/cases/${id}`)
  //       .catch((err) => console.log(err));
  //     const data = await res.data;
  //     return data;
  //   };
  //   useEffect(() => {
  //     fetchDetails().then((data) => {
  //       setBlog(data.blog);
  //     });
  //   }, [id]);
  const getBlogById = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`/api/user/cases/${id}`);
      dispatch(hideLoading());
      if (response.data.success) {
        // setTitle(response.data.data);
        // setDescription(response.data.data.description);
        // setImage(response.data.data.image);
        setBlogs(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getBlogById();
  }, [id]);

  return (
    <div className="App">
      <NavBar />
      <h1 className="blogsdetail">Blog Spot</h1>
      {/* <Card
        style={{
          width: 300,
        }}
        cover={<img alt={title} src={image} />}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          image={<Avatar src={image} />}
          title={title}
          description={description}
        />
      </Card> */}
      {/* 
      <Case
        id={`${id}`}
        title={blog.title}
        description={blog.description}
        image={blog.image}
      /> */}

      {/* <img alt={id} src={blogs.image} />
      <h2>{blogs.title}</h2>
      <h2>{blogs.description}</h2> */}
      {blogs &&
        blogs.map((blog, index) => (
          <div>
            {/* <Case
            id={blog._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
          /> */}
            <h2 className="blogdetailtitle">{blog.title}</h2>
            <h6 className="blogpublishdate">Published On: {blog.date}</h6>
            <div className="blogdetailimagecontainer">
              <img
                className="blogdetailimage"
                alt={blog.title}
                src={blog.image}
              />
            </div>
            <div className="blogdetaildescriptioncontainer">
              <h3 className="blogdetaildescription">{blog.description}</h3>
            </div>
          </div>
        ))}

      <Footer />
    </div>
  );
}

export default CaseDetail;
