import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import logo from "../assets/cinemax.png";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="my-nav">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="logo" className="imagen" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links" > 
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
              <h3>Home</h3>
            </NavLink>
            <NavLink to="/watchlist" className={({ isActive }) => (isActive ? "active-link" : "")}>
              <h3>WatchList</h3>
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "active-link" : "")}>
              <h3>About</h3>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
