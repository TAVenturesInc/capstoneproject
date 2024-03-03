import React from "react";
import { Button, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useGameContext, useLoginContext } from "../../context";
import { useStyleContext } from "../../context/styleContext";

export default function NavbarComponent() {
  const { theme, toggleTheme } = useStyleContext();

  const handleClick = () => {
    toggleTheme();
  };

  const { actions: loginActions, loggedIn } = useLoginContext();
  const { actions: gamesActions } = useGameContext();
  const logout = () => {
    loginActions.logOutUserAction();
    gamesActions.resetGameData();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Navbar.Brand style={{ paddingLeft: "20px" }}>
        <NavLink id={theme} className="nav-link" to="/">
          TA Ventures Inc
        </NavLink>
      </Navbar.Brand>
      <Nav className="me-auto">
        {loggedIn ? (
          <>
            <NavLink id={theme} className="nav-link" to="/games">
              Games
            </NavLink>
            <NavLink id={theme} className="nav-link" to="/profile">
              My Profile
            </NavLink>
            <NavLink id={theme} className="nav-link" to="/" onClick={logout}>
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
      <Button
        id={theme}
        className="theme"
        onClick={handleClick}
        style={{ marginRight: "8px" }}
      >
        Theme
      </Button>
    </nav>
  );
}
