import React, { Component } from "react";

import { Row, Col,Progress } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardImg from "reactstrap/lib/CardImg";
import CardBody from "reactstrap/lib/CardBody";
import { generatePhotoPlaceholderURL } from 'react-placeholder-image';
import CardFooter from "reactstrap/lib/CardFooter";
import { NavLink as RouterNavLink } from "react-router-dom";
import getUser from "../utils/getUser";


class Content extends Component {
  
  render() {

  
    return (
        <div className="next-steps p-5">

<Card className="text-center mb-5 h-100 w-100'"  style={{cursor : 'pointer' }}>
          
          <CardHeader className="">Available Balance : {getUser.id}</CardHeader>
          
          <Row>
            <Col></Col>
          </Row>
          <CardBody>
          <Row className="d-flex justify-content-between">
            <Col>
              <CardImg  src={generatePhotoPlaceholderURL(200, 100)}></CardImg>
            </Col>
            <RouterNavLink
      to="/balance"
      activeClassName="router-link-exact-active"
    >
            <Col className="mb-4  align-content-between h-100 w-100">

              <h1 >
                Available Balance
              </h1>
              <h2>
                
              </h2>
            </Col>
            </RouterNavLink>
          </Row>

          </CardBody>
          <CardFooter></CardFooter>
          </Card>

        <Row className="d-flex justify-content-between">
          {contentData.map((col, i) => (
            <Col key={i} md={5} className="mb-4" style={{cursor : 'pointer' }}>
              
              <Card className="text-center mb-5 h-100 w-100'">
              
              
                <CardHeader className="">{col.title}</CardHeader>

                <CardImg  src={generatePhotoPlaceholderURL(200, 100)}></CardImg>
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
}

export default Content;

