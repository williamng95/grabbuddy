import React,{useState,useEffect} from "react";
import { NavLink as RouterNavLink } from "react-router-dom";
import { faPlus,faComment, faCompass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from 'reactstrap';
import { useAuth0 } from "@auth0/auth0-react";
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
  Col,
  Form,
  Input,
  select
} from "reactstrap";



const Footer = () => {
    // Modal open state
    const [modal, setModal] = React.useState(false);
    const [transCat, setTransCat] = React.useState([]); 
    const [payee, setPayee] = React.useState([]);  
    // Toggle for Modal
    const toggle = () => setModal(!modal);

    const [tcat, setTcat] = useState("");
    const [tamt, setTamt] = useState("");
    const [tpayee, setTpayee] = useState("");
    const [balance, setBalance] = useState(0);

    const {
      user
    } = useAuth0();

    useEffect(() => {
      getTransCat();
      getPayee();
      getBalance();
  
      // we will use async/await to fetch this data
      async function getTransCat() {
          const response = await fetch("https://api-test-buddy.glitch.me/api/transactions/categories");
          const data = await response.json();
          setTransCat(data) ;
      }
      // we will use async/await to fetch this data
      async function getPayee() {
          const response = await fetch("https://api-test-buddy.glitch.me/api/users/all");
          const data = await response.json();
          const unique = [...new Set(data.map(data => data.id))];
          setPayee(unique) ;
      }

      async function getBalance() {
        const response = await fetch(`https://api-test-buddy.glitch.me/api/accounts/balance_by_owner_id?owner_id=${user.nickname}`);
        const data = await response.json();
        console.log(data);
        setBalance(data) ;
      }

      }, []);

    const postTrans = () =>{
      post(); 
      async  function post() {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ category: document.getElementById('tcat').value,
                                  transaction_amount: document.getElementById('tamt').value,
                                  payer_id: 1,
                                  payee_id: document.getElementById('tpayee').value})
      };
      console.log(requestOptions);
      const response = await fetch("https://api-test-buddy.glitch.me/api/transactions/add",requestOptions);
      const data = await response.json();

      (data) ? alert("Transaction Successful!") : alert("Transaction Not Successful!");



      window.location.reload(false);

    }
  }

 

  const handleTcatChange = (e) => {
    setTcat(e.target.value);
  };

  const handleTamtChange = (e) => {
    setTamt(e.target.value);
  };

  const handleTpayeeChange = (e) => {
    setTpayee(e.target.value);
  };

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
            <Form>
              <ModalHeader
                  toggle={toggle}>New Transaction</ModalHeader>
              <ModalBody>
              
                <Row>
                  <Col>
                  <p>Payment Category</p>
                  <p>Amount</p>
                  <p>Payee ID</p>
                  </Col>
                  <Col>
                  <p>
                  <select id='tcat' onChange={handleTcatChange}>
                  {transCat.map((col, i) => (
                    <option key={i} value={col.category}>{col.comment}</option>
                  ))};
                  </select>
                  </p>
                  <p>
                  <Input type="number" onChange={handleTamtChange} name="amount" id="tamt"  pattern="[0-9]*" inputmode="numeric" />
                  </p>
                  <p>

                  <select id='tpayee' onChange={handleTpayeeChange}>
              {payee.map((col, i) => (
                  <option key={i} value={col}>{col}</option>
              ))};
              </select>
                  </p>

                  </Col>
                </Row>
                
              </ModalBody>
              <ModalFooter>
                  <Button color="primary" onClick={() => {postTrans();toggle();}}>Okay</Button>
              </ModalFooter>
            </Form>
    </Modal>

  </footer>
)};



export default Footer;
