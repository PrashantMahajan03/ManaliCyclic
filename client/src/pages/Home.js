import React from "react";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../NavBar";
import Center from "../Center";
import SpecialCard from "../Speciality";
import Consultation from "../Consultation";
import Aboutme from "../AboutMe";
import Footer from "../Footer";

function Home() {
  return (
    <div className="App">
      <NavBar />
      <Center />
      <SpecialCard />
      <Consultation />
      <Aboutme />
      <Footer />
    </div>
  );
}

export default Home;
