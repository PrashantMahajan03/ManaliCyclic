import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import sp1 from "./Images/Speciality/GS/10.jpg";
import sp2 from "./Images/Speciality/GS/6.jpg";
import sp3 from "./Images/Speciality/GS/8.jpg";
import sp4 from "./Images/Speciality/GS/5.jpg";
import sp5 from "./Images/Speciality/GS/7.jpg";
import sp6 from "./Images/Speciality/GS/1.jpg";
import sp7 from "./Images/Speciality/GS/9.jpg";
import sp8 from "./Images/Speciality/GS/3.jpg";
import sp9 from "./Images/Speciality/GS/11.jpg";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import consultimage from "./Images/dental-consult-4.png";

function Consultation() {
  const navigate = useNavigate();
  const register = () => {
    navigate("/register", { replace: true });
  };
  return (
    <div>
      <h2 class="consult-text-h2">
        Expert <span>Consultation</span> for your Dental Problems!{" "}
        <span>Contact Now!</span>
      </h2>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col>
          <Carousel
            className="consultcarousel"
            fade
            prevIcon={
              <span
                aria-hidden="false"
                className="carousel-control-prev-icon"
              />
            }
            nextIcon={
              <span
                aria-hidden="false"
                className="carousel-control-next-icon"
              />
            }
          >
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp1} alt="sp1" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp2} alt="sp2" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp3} alt="sp3" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp4} alt="sp4" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp5} alt="sp5" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp6} alt="sp6" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp7} alt="sp7" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp8} alt="sp8" />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img className="consultationimages" src={sp9} alt="sp9" />
            </Carousel.Item>
          </Carousel>
        </Col>
        <Col>
          <Card className="booknowcard">
            <Card.Body>
              <Card.Title className="doctext">For Doctors</Card.Title>
              <Card.Text className="docbody">
                Need advice for your patients?
              </Card.Text>
              <Button onClick={register} className="btn-doc" variant="primary">
                Book Now
              </Button>
              <img
                className="cardimageconsult"
                src={consultimage}
                alt="cardimageconsult"
              />
            </Card.Body>
          </Card>
          <Card className="booknowcard">
            <Card.Body>
              <Card.Title className="patienttext">For Patients</Card.Title>
              <Card.Text className="patientbody">
                Got Dental Problems?
              </Card.Text>
              <Button
                onClick={register}
                className="btn-patient"
                variant="primary"
              >
                Book Now
              </Button>
              <img
                className="cardimageconsult"
                src={consultimage}
                alt="cardimageconsult"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Consultation;
