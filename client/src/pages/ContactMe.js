import React from "react";
import Footer from "../Footer";
import NavBar from "../NavBar";

function ContactMe() {
  return (
    <div>
      <NavBar />
      <h1 className="contactme">Contact Me</h1>
      <div>
        <h2 className="contactcontext">
          Currently you can contact me using the consultation portal or write me
          up on <span>drmanalisomani@gmail.com</span>
        </h2>
      </div>
      <Footer />
    </div>
  );
}

export default ContactMe;
