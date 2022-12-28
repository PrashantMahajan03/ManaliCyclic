import React from "react";
import Card from "react-bootstrap/Card";
import bridge from "./Images/Purple Line/20220625-Bridge.jpg";
import crown from "./Images/Purple Line/20220625-Crown.jpg";
import denture from "./Images/Purple Line/20220625-Denture.jpg";
import implant from "./Images/Purple Line/20220625-Implant.jpg";
import isd from "./Images/Purple Line/20220625-ISD.jpg";
import laminates from "./Images/Purple Line/20220625-Laminates.jpg";
import rpd from "./Images/Purple Line/20220625-RPD.jpg";
import splint from "./Images/Purple Line/20220625-Splint.jpg";
import Carousel from "react-bootstrap/Carousel";
import CardGroup from "react-bootstrap/CardGroup";

function SpecialCard() {
  return (
    <div className="speciality">
      <h3 className="h3-sp">
        Consult for the best <span className="span-sp">Specialisation </span>in:
      </h3>

      <Carousel
        fade
        variant="dark"
        prevIcon={
          <span aria-hidden="false" className="carousel-control-prev-icon" />
        }
        nextIcon={
          <span aria-hidden="false" className="carousel-control-next-icon" />
        }
        className="normalportcards"
      >
        <Carousel.Item>
          <CardGroup className="cardgroup">
            <Card className="specialitycard">
              <img className="specialityimage" src={bridge} alt="bridge" />
            </Card>
            <Card className="specialitycard">
              <img className="specialityimage" src={crown} alt="crown" />
            </Card>
            <Card className="specialitycard">
              <img className="specialityimage" src={denture} alt="denture" />
            </Card>
            <Card className="specialitycard">
              <img className="specialityimage" src={implant} alt="implant" />
            </Card>
          </CardGroup>
        </Carousel.Item>
        <Carousel.Item>
          <CardGroup className="cardgroup">
            <Card className="specialitycard">
              <img className="specialityimage" src={isd} alt="isd" />
            </Card>
            <Card className="specialitycard">
              <img
                className="specialityimage"
                src={laminates}
                alt="laminates"
              />
            </Card>
            <Card className="specialitycard">
              <img className="specialityimage" src={rpd} alt="rpd" />
            </Card>
            <Card className="specialitycard">
              <img className="specialityimage" src={splint} alt="splint" />
            </Card>
          </CardGroup>
        </Carousel.Item>
      </Carousel>
      <Carousel fade variant="dark" className="mobilecards">
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={bridge} alt="bridge" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={crown} alt="crown" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={denture} alt="denture" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={implant} alt="implant" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={isd} alt="isd" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={laminates} alt="laminates" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={rpd} alt="rpd" />
          </Card>
        </Carousel.Item>
        <Carousel.Item>
          <Card className="specialitycard">
            <img className="specialityimage" src={splint} alt="splint" />
          </Card>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default SpecialCard;
