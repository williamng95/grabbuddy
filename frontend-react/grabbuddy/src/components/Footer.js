import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { faPlus,faComment, faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


const Footer = () => (
  <footer className="bg-light p-3 text-center" style={{"min-height":"0"}}>
    <Navbar color="light" light expand="md" fixed="bottom">
        <Container className="justify-content-between" >
          <Nav className="d-none d-md-block" navbar style={{"padding":"0"}}>
            <NavItem>
              <RouterNavLink to="/">
                <FontAwesomeIcon icon={faCompass} className="fa-2x" />
              </RouterNavLink>
            </NavItem>
            </Nav>
            <Nav>
            <NavItem>
              <RouterNavLink to="/profile">
                <FontAwesomeIcon icon={faPlus} className="fa-2x" />
              </RouterNavLink>
            </NavItem>
          </Nav>
          <Nav>
            <NavItem>
              <RouterNavLink to="/external-api" >
                <FontAwesomeIcon icon={faComment} className="fa-2x" />
              </RouterNavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
  </footer>
);

export default Footer;
