import React, { useState, useEffect  } from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useAuth0 } from "@auth0/auth0-react";



const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

const [users, setUsers] = useState(null);

const handleChange = () => {
    console.log("asd");
}

const toggle = () => setIsOpen(!isOpen);


// + adding the use
useEffect(() => {
  getData();

  // we will use async/await to fetch this data
  async function getData() {
    const response = await fetch("https://api-test-buddy.glitch.me/api/users/all");
    const data = await response.json();

    // store the data into our books variable
    setUsers(data) ;
  }
}, []);

  return (
  <><div className="nav-container fixed-top" style={{ "minHeight": "" }}>
        <Navbar color="light" light expand="md" fixed="top" style={{"padding":"0"}}>
          <Container>
            <NavbarBrand className="logo" />
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink
                    tag={RouterNavLink}
                    to="/"
                    exact
                    activeClassName="router-link-exact-active"
                  >
                    Home
                  </NavLink>
                </NavItem>
                {isAuthenticated && (
                  <NavItem>
                    Select User
                    
                      {users && (
                      <select name="selectUser">
                        {users.map((user, index) => (
                          <option key={index} value={user.id} onChange={handleChange} >{user.id}</option>
                        ))}

                      </select>
                      )}
                    
                  </NavItem>
                )}
                {/* {isAuthenticated && (
      <NavItem>
        <NavLink
          tag={RouterNavLink}
          to="/external-api"
          exact
          activeClassName="router-link-exact-active"
        >
          External API 2
        </NavLink>
      </NavItem>
    )} */}
              </Nav>
              <Nav className="d-none d-md-block" navbar>
                {!isAuthenticated && (
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      className="btn-margin"
                      onClick={() => loginWithRedirect()}
                    >
                      Log in
                    </Button>
                  </NavItem>
                )}
                {isAuthenticated && (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret id="profileDropDown">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile rounded-circle"
                        width="50" />
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem header>{user.name}</DropdownItem>
                      <DropdownItem
                        tag={RouterNavLink}
                        to="/profile"
                        className="dropdown-profile"
                        activeClassName="router-link-exact-active"
                      >
                        <FontAwesomeIcon icon="user" className="mr-3" /> Profile
                      </DropdownItem>
                      <DropdownItem
                        id="qsLogoutBtn"
                        onClick={() => logout(`https://dev-atxi2549.us.auth0.com/v2/logout?returnTo=${process.env.PUBLIC_URL}`)}
                      >
                        <FontAwesomeIcon icon="power-off" className="mr-3" /> Log
                        out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                )}
              </Nav>
              {!isAuthenticated && (
                <Nav className="d-md-none" navbar>
                  <NavItem>
                    <Button
                      id="qsLoginBtn"
                      color="primary"
                      block
                      onClick={() => logout(`https://dev-atxi2549.us.auth0.com/v2/logout?returnTo=${process.env.PUBLIC_URL}`)}
                    >
                      Log in
                    </Button>
                  </NavItem>
                </Nav>
              )}
              {isAuthenticated && (
                <Nav
                  className="d-md-none justify-content-between"
                  navbar
                  style={{ minHeight: 170 }}
                >
                  <NavItem>
                    <span className="user-info">
                      <img
                        src={user.picture}
                        alt="Profile"
                        className="nav-user-profile d-inline-block rounded-circle mr-3"
                        width="50" />
                      <h6 className="d-inline-block">{user.name}</h6>
                    </span>
                  </NavItem>
                  <NavItem>
                    <FontAwesomeIcon icon="user" className="mr-3" />
                    <RouterNavLink
                      to="/profile"
                      activeClassName="router-link-exact-active"
                    >
                      Profile
                    </RouterNavLink>
                  </NavItem>
                  <NavItem>
                    <FontAwesomeIcon icon="power-off" className="mr-3" />
                    <RouterNavLink
                      to="#"
                      id="qsLogoutBtn"
                      onClick={() => logout(`https://dev-atxi2549.us.auth0.com/v2/logout?returnTo=${process.env.PUBLIC_URL}`)}
                    >
                      Log out
                    </RouterNavLink>
                  </NavItem>
                </Nav>
              )}
            </Collapse>
          </Container>
        </Navbar>
      </div></>
  );
};

export default NavBar;
