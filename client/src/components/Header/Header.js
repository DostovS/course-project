import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { useTranslation } from 'react-i18next';
import './Header.scss';

function Header({themeToggler,theme}) {
  const {t, i18n} = useTranslation();
  const changeLanguage = (lng) => {
    return () => {
      i18n.changeLanguage(lng);
      localStorage.setItem("language", lng);
    }
  }

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  return (
    <Navbar 
      variant="dark" 
      bg="dark" 
      expand="lg"
      className='header'>
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
              {t("nav-home")} 
            </Nav.Link>
            <Nav.Link href="/profile">
              {t("nav-profile")}
            </Nav.Link>
            <NavDropdown title={t("nav-account")}
              id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">
                {t("nav-login")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/signup">
                {t("nav-signup")} 
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item style={{"color": 'red'}}
                onClick={logOut}>          
                {t("nav-logout")}
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title={localStorage.getItem("language") === "ru" ? "RUS" : "ENG"}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item onClick={changeLanguage("en")}>
                English 
              </NavDropdown.Item>
              <NavDropdown.Item onClick={changeLanguage("ru")}>
                Русский
              </NavDropdown.Item>
            </NavDropdown>
            <i 
              className='theme'
              onClick={themeToggler}>
              {theme === "light" ? (
                <Brightness4Icon />
              ) : null}
              {theme === "dark" ? (
                <WbSunnyIcon />
              ) : null}
            </i>
          </Nav>
          
          <Form className="d-flex">
          <Form.Control
              type="search"
              placeholder={t("nav-search")}
              className="me-2 search"
              aria-label="Search"
            />
            <Button 
              variant="outline-success">
                {t("nav-search")}
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;