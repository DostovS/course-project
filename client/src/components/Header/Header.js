import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from 'react-i18next';
import './Header.scss';

function Header() {
  const {t, i18n} = useTranslation();
  const changeLanguage = (lng) => {
    return () => {
      i18n.changeLanguage(lng);
    }
  }
  return (
    <Navbar 
      variant="dark" 
      bg="dark" 
      expand="lg">
      <Container fluid>
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
              {t("home")}
            </Nav.Link>
            <Nav.Link href="/profile">
              {t("profile")}
              <FontAwesomeIcon icon={faUser} 
                className='ms-1'/>
            </Nav.Link>
            <NavDropdown title={t("account")}
              id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">
              {t("login")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/signup">
                {t('sign')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className="delete">
              {t("logout")}
              </NavDropdown.Item>
            </NavDropdown>
            <button onClick={changeLanguage('eng')}>English</button>
            <button onClick={changeLanguage('ru')}>Русский</button>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={t("search")}
              className="me-2 search"
              aria-label="Search"
            />
            <Button 
              variant="outline-success">
                {t("search")}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;