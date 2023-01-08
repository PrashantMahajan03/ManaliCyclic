import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import consultimage from "./Images/dental-consult-4.png";
import specialitylist from "./specialitylistimages";

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
                className="carousel-control-prev-icon icon"
              />
            }
            nextIcon={
              <span
                aria-hidden="false"
                className="carousel-control-next-icon icon"
              />
            }
          >
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[0].src}
                alt="sp1"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[1].src}
                alt="sp2"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[2].src}
                alt="sp3"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[3].src}
                alt="sp4"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[4].src}
                alt="sp5"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[5].src}
                alt="sp6"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[6].src}
                alt="sp7"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[7].src}
                alt="sp8"
              />
            </Carousel.Item>
            <Carousel.Item interval={1000}>
              <img
                className="consultationimages"
                src={specialitylist[8].src}
                alt="sp9"
              />
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
