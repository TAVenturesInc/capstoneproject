import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { useGameContext, useLoginContext } from "../../context";

export default function NavbarComponent() {
  const { actions: loginActions, loggedIn } = useLoginContext();
  const { actions: gamesActions } = useGameContext();
  const logout = () => {
    loginActions.logOutUserAction();
    gamesActions.resetGameData();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Navbar.Brand style={{ paddingLeft: "20px" }}>
        <NavLink className="nav-link" to="/">
          TA Ventures Inc
        </NavLink>
      </Navbar.Brand>
      <Nav className="me-auto">
        {loggedIn ? (
          <>
            <NavLink className="nav-link" to="/games">
              Games
            </NavLink>
            <NavLink className="nav-link" to="/profile">
              My Profile
            </NavLink>
            <NavLink className="nav-link" to="/" onClick={logout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="nav-link" to="/register">
              Register
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </>
        )}
      </Nav>
    </nav>
  );
}
