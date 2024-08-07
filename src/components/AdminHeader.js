import React from "react";
import logo from "../assets/Logo.png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function AdminHeader({ handleLogout }) {
  const handelLogin = () => {
    alert("Hii");
  };

  return (
    <div className="container-fluid p-0 adminHeader ">
      <Navbar collapseOnSelect expand="lg" className="px-2 adminHeaderNav">
        <Navbar.Brand className=" d-flex">
          <img
            src={logo}
            height="40"
            className="d-inline-block align-top"
            alt="ECS Training"
          />
          <div class="text-light d-flex justify-content-center align-items-center">
            <h2 class="mb-0 fw-bold">ECS</h2>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="me-auto ">
            <Nav.Link as={NavLink} to="/home" className="me-1 ">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/eventbooking"} className="me-1">
              Event Book
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="me-1">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
