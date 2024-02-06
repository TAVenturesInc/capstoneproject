import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Navbar, Nav } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Navbar.Brand href="#home" style={{ paddingLeft: "20px" }}>
        TA Ventures Inc
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/register">Register</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
      </Nav>
    </nav>
  );
}
