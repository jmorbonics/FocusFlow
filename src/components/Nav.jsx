// src/Navbar.js
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';
import focusflowLogo from '../assets/focusflowtransparent.png'; // Adjust the import path as needed

function NavbarFlow() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand href="home">
          <img
            src={focusflowLogo}
            alt="FocusFlow Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          FocusFlow
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="calibrate">Calibrate</Nav.Link>
            <Nav.Link href="parse">Parse</Nav.Link>
            <Nav.Link href="gpt">AI-Helper</Nav.Link>
            <Nav.Link href="mldata">Get Data</Nav.Link>
            <Nav.Link href="games">Games!</Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarFlow;