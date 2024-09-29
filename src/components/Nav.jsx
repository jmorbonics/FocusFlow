// src/Navbar.js
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';
import focusflowLogo from '../assets/focusflowtransparent.png'; // Adjust the import path as needed

import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = () => {
  const [isGamesEnabled, setIsGamesEnabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsGamesEnabled(true);
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  const handleMouseEnter = () => {
    if (!isGamesEnabled) {
      setMessage('Games will be enabled after 1 minute.');
    }
  };

  const handleMouseLeave = () => {
    setMessage('');
  };

  const handleClick = (e) => {
    if (!isGamesEnabled) {
      e.preventDefault();
      setMessage('Please wait for 1 minute to access Games.');
    }
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">FocusFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="home">Home</Nav.Link>
            <Nav.Link href="calibrate">Calibrate</Nav.Link>
            <Nav.Link href="parse">Parse</Nav.Link>
            <Nav.Link href="gpt">AI-Helper</Nav.Link>
            <Nav.Link href="mldata">Get Data</Nav.Link>
            <Nav.Link
              href="games"
              disabled={!isGamesEnabled}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            >
              Games!
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {message && <div className="message">{message}</div>}
    </>
  );
};

export default NavBar;