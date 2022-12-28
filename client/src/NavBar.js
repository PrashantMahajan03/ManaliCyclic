import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

// function NavBar() {
//   return (
//     <div>
//       <div>
//         <Navbar className="color-nav" variant="light">
//           <Container>
//             <Navbar.Brand className="navbrand" href="/">
//               Dr. Manali Somani
//             </Navbar.Brand>
//             <Nav className="ms-auto navbar-expand-md navbar-expand-xs">
//               <Nav.Link className="navlinks active" href="/">
//                 Home
//               </Nav.Link>
//               <Nav.Link className="navicons" href="/">
//                 <i className="navicons" class="ri-home-2-fill"></i>
//               </Nav.Link>

//               <Nav.Link className="navlinks" href="/explorecases">
//                 Blog
//               </Nav.Link>
//               <Nav.Link className="navlinks" href="/login">
//                 Consultation
//               </Nav.Link>
//               <Nav.Link className="navlinks" href="#contact">
//                 Contact
//               </Nav.Link>
//             </Nav>
//           </Container>
//         </Navbar>
//       </div>
//     </div>
//     // <nav className="navbar navbar-expand-lg bg-light">
//     //   <div className="container-fluid">
//     //     <a className="navbar-brand navbrand" href="#">
//     //       Dr. Manali Somani
//     //     </a>
//     //     <button
//     //       className="navbar-toggler"
//     //       type="button"
//     //       data-bs-toggle="collapse"
//     //       data-bs-target="#navbarText"
//     //       aria-controls="navbarText"
//     //       aria-expanded="false"
//     //       aria-label="Toggle navigation"
//     //     >
//     //       <span className="navbar-toggler-icon"></span>
//     //     </button>
//     //     <div className="collapse navbar-collapse" id="navbarText">
//     //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//     //         <li className="nav-item">
//     //           <a
//     //             className="nav-link active navlinks"
//     //             aria-current="page"
//     //             href="/"
//     //           >
//     //             Home
//     //           </a>
//     //         </li>
//     //         <li className="nav-item">
//     //           <a className="nav-link navlinks" href="#">
//     //             Blog
//     //           </a>
//     //         </li>
//     //         <li className="nav-item">
//     //           <a className="nav-link navlinks" href="#">
//     //             Consultation{" "}
//     //           </a>
//     //         </li>
//     //         <li className="nav-item">
//     //           <a className="nav-link navlinks" href="#">
//     //             Contact{" "}
//     //           </a>
//     //         </li>
//     //       </ul>
//     //     </div>
//     //   </div>
//     // </nav>
//   );
// }

import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar expand="lg md xs sm">
      <Container>
        <Navbar.Brand className="navbrand" href="/">
          Dr. Manali Somani
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto navlink">
            <Nav.Link className="navlinks" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="navlinks" href="/explorecases">
              Blogs
            </Nav.Link>
            <Nav.Link className="navlinks" href="/login">
              Consultation
            </Nav.Link>
            <Nav.Link className="navlinks" href="/contact">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
