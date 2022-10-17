import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Header.scss';

function Header() {
  return (
    <Navbar 
      variant="dark" 
      bg="dark" 
      expand="lg">
      <Container fluid >
        <Navbar.Brand 
          href="/" 
          className='logo'>
            ANNOUNCE
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="navbarScroll" 
          className='menu'/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 center">
            <Nav.Link href="/">
              Home
            </Nav.Link>
            <Nav.Link href="/profile">
              Profile
              <FontAwesomeIcon icon={faUser} 
                className='ms-1'/>
            </Nav.Link>
            <NavDropdown title="Account" 
              id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">
                Login
              </NavDropdown.Item>
              <NavDropdown.Item href="/signup">
                Sign Up
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="delete">
                Log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search"
              aria-label="Search"
            />
            <Button 
              variant="outline-success">
                Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;