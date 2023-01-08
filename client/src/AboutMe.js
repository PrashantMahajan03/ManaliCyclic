import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import manaliaboutme from "./Images/DSC08639-1.png";
import manalibw from "./Images/ManaliBW.png";

function Aboutme() {
  return (
    <Row className="aboutmerow">
      <h3 class="h3-aboutme">
        My Name is <span>Manali Somani</span>. I have completed{" "}
        <span>MDS in Prosthodontics and Crown & Bridge and Implantology</span>{" "}
        from Rajasthan University of Health & Science, <span>India</span> in
        2019. Currently I am located in Baden-Wuettemberg state of{" "}
        <span>Germany</span>. With <span>3 years</span> of clinical{" "}
        <span>experience</span> dealing with diverse cases, I am providing
        regular
        <span> consultations</span> to Doctors & Patients <span>worldwide</span>
        .
      </h3>

      <img
        className="manali-about-me"
        src={manaliaboutme}
        alt="manali-about-me"
      />
      {/* <img className="manali-about-me" src={manalibw} alt="manali-about-me" /> */}
    </Row>
  );
}

export default Aboutme;
