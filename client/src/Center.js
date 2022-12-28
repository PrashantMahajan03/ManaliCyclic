import React from "react";
import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import image1 from "./Images/Manali-DT.png";
import { Row } from "antd";
import { hideLoading, showLoading } from "./redux/alertsSlice";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";

function Center() {
  const navigate = useNavigate();
  const directContact = () => {
    navigate("/contact", { replace: true });
  };
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/signup", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong");
    }
  };
  return (
    <div>
      <Row>
        <div className="contenttext">
          <h1 className="h1text">
            I can <span>Crown</span> anyone and <span>Bridge</span> any Gaps
          </h1>
          <Button onClick={directContact} className="btn-contact">
            Contact Me
          </Button>
          <Button
            className="btn-case"
            variant="primary"
            onClick={() => {
              navigate("/explorecases");
            }}
          >
            Explore My Case Histories
          </Button>
          {/* <Form onSubmit={onFinish}>
            <Form.Group className="signupnewsletter">
              <Form.Control
                name="email"
                className="signupnewsletter"
                type="email"
                placeholder="Sign-Up for Monthly Newsletter"
              />
            </Form.Group>
            <Button className="btn-signup" variant="primary" type="submit">
              Sign-Up
            </Button>
          </Form> */}
          <Form onFinish={onFinish}>
            <Form.Item className="signupnewsletter" name="email">
              <Input
                className="signupnewsletter"
                placeholder="Sign-Up for Monthly Newsletter"
              />
            </Form.Item>
            <Button className="btn-signup" type="submit">
              Sign-Up
            </Button>
          </Form>
        </div>

        <img className="image1" src={image1} alt="image1" />
      </Row>
    </div>
  );
}

export default Center;
