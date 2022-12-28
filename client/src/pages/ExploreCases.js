import React, { useEffect, useState } from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Card, Carousel, Col, Row } from "antd";
import Meta from "antd/lib/card/Meta";

function ExploreCases() {
  const [blogs, setBlogs] = useState();
  const [highlights, setHighlight] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAllBlogs = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-all-blogs");
      dispatch(hideLoading());
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const getHighlightBlog = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/get-highlight-blog");
      dispatch(hideLoading());
      if (response.data.success) {
        setHighlight(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);
  useEffect(() => {
    getHighlightBlog();
  }, []);

  const addEllipsis = (str, limit) => {
    return str.length > limit
      ? str.substring(0, limit) + "...  Read More"
      : str;
  };

  return (
    <div>
      <NavBar />
      <h1 className="blogspot">Blog Spot</h1>
      <div>
        <Row>
          {highlights &&
            highlights.map((highlight, index) => (
              <Col
                className="explorecasecardcol"
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={8}
              >
                <Link to={`/cases/${highlight._id}`}>
                  <Card
                    className="highlightcard"
                    cover={
                      <img
                        className="highlightcardimg"
                        alt={highlight.title}
                        src={highlight.image}
                      />
                    }
                  >
                    <Meta
                      className="highlightcardbodystyle"
                      id={highlight._id}
                      image={<Avatar src={highlight.image} />}
                      date={highlight.date}
                      title={highlight.title}
                      description={addEllipsis(highlight.description, 250)}
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          {/* <Col span={8} offset={8}> */}
          <Col
            className="explorecasecardcol"
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
          >
            <Carousel autoplay slidesToShow={2} vertical="false" dots="false">
              {blogs &&
                blogs.map((blog, index) => (
                  <Link to={`/cases/${blog._id}`}>
                    <Card
                      className="explorecasecards"
                      cover={
                        <img
                          className="cardbodystyle"
                          alt={blog.title}
                          src={blog.image}
                        />
                      }
                    >
                      <Meta
                        className="cardbodystyle"
                        id={blog._id}
                        image={
                          <Avatar className="imagecasecard" src={blog.image} />
                        }
                        date={blog.date}
                        title={blog.title}
                        description={addEllipsis(blog.description, 100)}
                      />
                    </Card>
                  </Link>
                ))}
            </Carousel>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreCases;
