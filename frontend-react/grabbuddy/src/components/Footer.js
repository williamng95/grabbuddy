import React,{useState} from "react";
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
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  Col
} from "reactstrap";



const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Footer = () => {
    // Modal open state
    const [modal, setModal] = React.useState(false);
  
    // Toggle for Modal
    const toggle = () => setModal(!modal);
  return(
  
  <footer className="bg-light p-3 text-center" style={{"minHeight":"0"}}>
    
    <Navbar color="light" light expand="md" fixed="bottom" style={{"padding":"0"}}>
        <Container className="justify-content-between" >
          <Nav>
            <NavItem>
              <RouterNavLink to="/">
                <FontAwesomeIcon icon={faCompass} className="fa-2x" />
              </RouterNavLink>
            </NavItem>
            </Nav>
            <Nav>
            <NavItem>
                <NavLink href="#"  onClick={toggle}> 
                  <FontAwesomeIcon icon={faPlus} className="fa-2x" />
                </NavLink>
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

      <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader
                    toggle={toggle}>New Transaction</ModalHeader>
                <ModalBody>
                  <form>
                  <Row>
                    <Col>
                    <p>Payment To</p>
                    <p>Amount</p>
                    </Col>
                    <Col>
                    <select>
                    {options.map((col, i) => (
                      <option key={i} value={col.value}>{col.label}</option>
                    ))};
                    </select>
                    <input type="text" name="amount" />
                    </Col>
                  </Row>
                  </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Okay</Button>
                </ModalFooter>
            </Modal>

  </footer>
)};



export default Footer;
