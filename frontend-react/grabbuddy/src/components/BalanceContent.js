import React, { Component } from "react";

import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contentData from "../utils/contentData";
import Card from "reactstrap/lib/Card";
import CardHeader from "reactstrap/lib/CardHeader";
import CardImg from "reactstrap/lib/CardImg";
import CardBody from "reactstrap/lib/CardBody";
import { generatePhotoPlaceholderURL } from 'react-placeholder-image';
import CardFooter from "reactstrap/lib/CardFooter";
import { NavLink as RouterNavLink } from "react-router-dom";
import { Progress, Container } from "reactstrap";



class Content extends Component {

  
  render() {

  
    return (
        <div className="next-steps p-5">
        <Card className="text-center mb-5 h-100 w-100'"  style={{cursor : 'pointer' }}>
          
          <CardHeader className="">You have spent {"$32"} this month!</CardHeader>
          
          <Row>
            <Col></Col>
          </Row>
          <CardBody>
          <Row className="d-flex justify-content-between">
            <Col>
              <CardImg  src={generatePhotoPlaceholderURL(200, 100)}></CardImg>
            </Col>
            <Col md={5} className="mb-4  align-content-between h-100 w-100">

              <Progress  color="success" value="30" className="mb-4">
                Gaming
              </Progress>
              <Progress  color="info" value="25" className="mb-4">
                Food
              </Progress>
              <Progress  color="warning" value="20" className="mb-4">
                Transport
              </Progress>
              <Progress  color="danger" value="5" className="mb-4">
                !!
              </Progress>
            </Col>
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
                  { isNaN(col.description)?col.description: ""}
                  </CardBody>
                <CardFooter>{col.description}</CardFooter>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Content;

