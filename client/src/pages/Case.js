import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Card, Carousel, Col, Row } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const { Meta } = Card;
const Case = ({ title, description, image, id }) => {
  const navigate = useNavigate;
  return (
    <Link to={`/cases/${id}`}>
      <Card className="casecards" cover={<img alt={title} src={image} />}>
        <Meta
          className="cardbodystyle"
          id={id}
          image={<Avatar className="imagecasecard" src={image} />}
          title={title}
          description={description}
        />
      </Card>
    </Link>
  );
};

export default Case;
