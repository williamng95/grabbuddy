
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Input from 'reactstrap/lib/Input';
import { useAuth0 } from "@auth0/auth0-react";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function UpdateLimit() {
  const {
    user
  } = useAuth0();

  const handleClick =()=>{
    getData();

    // we will use async/await to fetch this data
    async function getData() {
      const requestOptions = {method: "PATCH",  
                              headers: {    "Content-type": "application/json"  },  
                              body: JSON.stringify({account_id: user.nickname , 
                                                    update:{wallet_limit: document.getElementById("inputID").value}})
                            }

      
      const response = await fetch(`https://api-test-buddy.glitch.me/api/accounts/update_limit?id=${user.nickname},`, requestOptions);
      const data = await response.json();
    }
  }

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" >
        <CardContent>
        <Typography variant="h5" component="div">
        This Api is for update Limit
        </Typography>
        <Typography variant="h5" component="div">
        Amount
        </Typography>
        <Input id="inputID"></Input>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>click</Button>
      </CardActions>
      </Card>
    </Box>
  );
}
