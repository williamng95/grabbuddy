import React, { Component, } from "react";

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
import EnhancedTable from "./TransactionDataTable";
import Chart from "react-google-charts";





class Content extends Component {
  constructor(props){
    super(props)
    this.state = {
      transactionData:[],
      total:0,
      gameTotal:0,
      foodTotal:0,
      transferTotal:0,
      othersTotal:0,
      limit:0
    }
  }
  


componentDidMount() {
    fetch('https://api-test-buddy.glitch.me/api/transactions/all')
      .then(response => response.json())
      .then(data => { console.log(data);
        this.setState({
          transactionData: data
        }, ()=>{console.log(this.state.transactionData)
        });
  });
}

calculateTotal(){
  let total = 0;
  for(var i=0;i<this.state.transactionData.length;i++){
    total += this.state.transactionData[i].transaction_amount;
  }
  return total;
}


calculateGameTotal(){
  let total = 0;
  for(var i=0;i<this.state.transactionData.length;i++){
    if(this.state.transactionData[i].category === "GAME")
    total += this.state.transactionData[i].transaction_amount;
  }
  return total;
}

calculateFoodTotal(){
  let total = 0;
  for(var i=0;i<this.state.transactionData.length;i++){
    if(this.state.transactionData[i].category === "FOOD")
    total += this.state.transactionData[i].transaction_amount;
  }
  return total;
}

calculateOthersTotal(){

  return this.calculateTotal() - this.calculateFoodTotal() - this.calculateGameTotal();
}
  
  render() {


  
    return (
        <div className="next-steps p-5">
        <Card className="text-center mb-5 h-100 w-100'"  style={{cursor : 'pointer' }}>
          
          <CardHeader className="">You have spent $ {this.calculateTotal()} this month!</CardHeader>
          
          <Row>
            <Col></Col>
          </Row>
          <CardBody>
          
          <Row className="d-flex justify-content-between">
            <Col md={5}  className="mb-4 d-flex align-items-center h-100 w-100">
            <Chart
 
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Spendings', 'Amount in $'],
    ['Game', this.calculateGameTotal()],
    ['Food', this.calculateFoodTotal()],
    ['Others', this.calculateOthersTotal()]
  ]}
  options={{
    title: 'Your Spendings Breakdown',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
            </Col>
            <Col md={5} className="mb-4 align-items-center h-100 w-100">
              
              <Progress  color="success" value={this.calculateGameTotal()/this.calculateTotal()*100} className="mb-4">
                Gaming
              </Progress>
              <Progress  color="info" value={this.calculateFoodTotal()/this.calculateTotal()*100} className="mb-4">
                Food
              </Progress>
              <Progress  color="warning" value={this.calculateOthersTotal()/this.calculateTotal()*100} className="mb-4">
                Others
              </Progress>
            </Col>
          </Row>

          </CardBody>
          <CardFooter></CardFooter>
          </Card>

        <EnhancedTable />
      </div>
    );
  }
}

export default Content;

