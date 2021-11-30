
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

export default function UpdateRestriction() {
  const {
    user
  } = useAuth0();

  const [transCat, setTransCat] = useState([]);
  const [tcat,setTcat] = useState("");

  useEffect(() => {
    getData();

    // we will use async/await to fetch this data
    async function getData() {
        const response = await fetch(`https://api-test-buddy.glitch.me/api/transactions/categories`);
      const data = await response.json();
      setTransCat(data);
    }

  },[]);

  const handleTcatChange = (e) => {
    setTcat(e.target.value);
  };


  const handleClick =()=>{
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const requestOptions = {method: "PATCH",  
                              headers: {    "Content-type": "application/json"  },  
                              body: JSON.stringify({account_id: user.nickname , 
                                                    update:{restricted_transaction: tcat}})
                            }

      console.log(requestOptions);
      const response = await fetch(`https://api-test-buddy.glitch.me/api/accounts/update_limit?id=${user.nickname}`, requestOptions);
      const data = await response.json();
    }
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        <CardContent>
        <Typography variant="h5" component="div">
        This Api is for restriction transaction Update
        </Typography>
        <Typography variant="h5" component="div">
        Amount
        </Typography>
        <select id='tcat' onChange={handleTcatChange}>
                  {transCat.map((col, i) => (
                    <option key={i} value={col.category}>{col.comment}</option>
                  ))};
                  </select>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>click</Button>
      </CardActions>
      </Card>
    </Box>
  );
}
