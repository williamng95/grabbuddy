import React, { useState, useEffect } from "react";

import { Row, Col,Progress, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardImg from "reactstrap/lib/CardImg";
import CardBody from "reactstrap/lib/CardBody";
import { generatePhotoPlaceholderURL } from 'react-placeholder-image';
import CardFooter from "reactstrap/lib/CardFooter";
import { NavLink as RouterNavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";




const Content = () => {
  const {
    user
  } = useAuth0();



  const [balance, setBalance] = useState([{wallet_balance:0}]);
  const [account, setAccount] = useState([{id:0,
  owner_id: 0,
  type: null,
  wallet_limit: 0,
  wallet_balance: 0,
  restricted_transaction: [],
  allowed_transaction: []}]);

  useEffect(() => {
    getBalance();
    getAccountData();
  
    // we will use async/await to fetch this data
    async function getBalance() {
      const response = await fetch(`https://api-test-buddy.glitch.me/api/accounts/balance_by_owner_id?owner_id=${user.nickname}`);
      const data = await response.json();
      console.log(data);
      setBalance(data) ;
    }

    
  async function getAccountData() {
    const response = await fetch(`https://api-test-buddy.glitch.me/api/accounts/by_owner_id?owner_id=${user.nickname}`);
    const data = await response.json();
    console.log(data);
    setAccount(data) ;
  }
  }, []);

  

  
return (
  
      <div className="next-steps p-5">

<Card className="text-center mb-5 h-100 w-100'"  style={{cursor : 'pointer' }}>
        
        <CardHeader className="">Account Details</CardHeader>
        
        <Row>
          <Col></Col>
        </Row>
        <CardBody>
        <Row className="d-flex justify-content-center ">
          <Col style={{width:"100%",maxWidth:"40vw"}}>
            <CardImg style={{width:"100%"}} src={generatePhotoPlaceholderURL(200, 100)}></CardImg>
          </Col>
          <RouterNavLink
    to="/balance"

  >
          <Col className="text-center h-100 w-100">

            <h1 >
              Available Balance :$ {balance[0].wallet_balance}
            </h1>
          </Col>
          </RouterNavLink>
        </Row>

        </CardBody>
        <CardFooter></CardFooter>
        </Card>

        {account[0].wallet_limit >0 && (
          <Alert color="warning" >
            You got a limit of ${account[0].wallet_limit} set by your parent!
          </Alert>
        )}

        {account[0].restricted_transaction != null && (
          <Alert color="warning" >
            Your parent has set a restriction on your {account[0].restricted_transaction} purchases!
            
          </Alert>
        )}

      <Row className="d-flex justify-content-between">
        {contentData.map((col, i) => (
          <Col key={i} md={5} className="mb-4" style={{cursor : 'pointer' }}>
            
            <Card className="text-center mb-5 h-100 w-100'">
            
            
              <CardHeader className="">{col.title}</CardHeader>

              <CardImg className="align-self-center" style={{maxWidth:"50%",height:"auto"}} src={"p"+(i+1)+".png"}></CardImg>
                <CardBody>
                {isNaN(col.description)?col.description: ""}
                </CardBody>
              <CardFooter> 
                <Progress color="success" value={col.description} className="mb-4"></Progress></CardFooter>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

}

export default Content;

