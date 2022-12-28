import React from "react";

function Footer() {
  return (
    <div>
      <div className="follow">
        <h4 className="followtext">Follow Me On </h4>
        <a
          href="https://www.linkedin.com/in/dr-manali-somani-94b03a1b2/"
          className="followicons"
        >
          <i className="ri-linkedin-fill"></i>
        </a>

        <a
          href="https://instagram.com/dr_manali_s?igshid=YmMyMTA2M2Y="
          className="followicons"
        >
          <i className="ri-instagram-fill"></i>
        </a>
        <a href="https://www.facebook.com/manali.29" className="followicons">
          <i className="ri-facebook-box-fill"></i>
        </a>

        <h5 className="footerend">
          All Images and Content Are Copyright Protected
        </h5>
        <h5 className="footerend">Website By</h5>
        <a href="https://twitter.com/DestiniFi" className="followfootericons">
          <i className="ri-twitter-fill"></i>
        </a>
      </div>
    </div>
  );
}

export default Footer;
