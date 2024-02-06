import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Navbar.Brand style={{ paddingLeft: "20px" }}>
        <NavLink className="nav-link" to="/">
          TA Ventures Inc
        </NavLink>
      </Navbar.Brand>
      <Nav className="me-auto">
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </Nav>
    </nav>
  );
}
