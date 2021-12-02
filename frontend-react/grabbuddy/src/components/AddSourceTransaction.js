
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from 'reactstrap/lib/Input';
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from 'react';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function AddSourceTransaction() {
  const {
    user
  } = useAuth0();

  const [currUser, setCurrUser] = useState([{id:null,
    create_time:null,
    update_time:null,
    first_name:"",
    last_name: "",
    mobile: null,
    email: "",
    login_id: "",
    login_password: "",
    user_type: "",
    parent_id:null}]);

    


  useEffect(() => {
    getAccountData();

    // we will use async/await to fetch this data
    async function getAccountData() {
      const response = await fetch(`https://api-test-buddy.glitch.me/api/users/by-id?id=${user.nickname}`);
      const data = await response.json();
      console.log(data);
      if(data.length>0){}
        setCurrUser(data) ;
    }


  },[]);

  const postTrans = () =>{
    post(); 
    async  function post() {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: "SOURCE",
                                transaction_amount: document.getElementById('inputTamtID').value,
                                payer_id: currUser[0].parent_id,
                                payee_id: user.nickname})
    };
    console.log(requestOptions);
    const response = await fetch("https://api-test-buddy.glitch.me/api/transactions/add",requestOptions);
    const data = await response.json();

    (data) ? alert("Transaction Successful!") : alert("Transaction Not Successful!");
    //window.location.reload(false);

  }
}

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        <CardContent>
        <Typography variant="h5" component="div">
        This Api is for Adding Transaction from source
        </Typography>
        <Typography variant="h5" component="div">
        Amount
        </Typography>
        <Input id="inputTamtID"></Input>
      </CardContent>
      <CardActions>
        
        {currUser[0].parent_id!=null && (
        <Button size="small" onClick={postTrans}>click</Button>
        )}
      </CardActions>
      </Card>
    </Box>
  );
}
