import React from "react";
import logo from "../assets/Logo (1).png";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import EventBooking from "../pages/EventBooking";

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
            alt="Event Space"
          />
          <div class="text-light d-flex justify-content-center align-items-center">
          </div>
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}

export default AdminHeader;
