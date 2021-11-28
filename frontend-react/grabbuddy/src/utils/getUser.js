import React from 'react';

 const getUser = {
  componentDidMount() {
    
    const apiUrl = 'https://api-test-buddy.glitch.me/api/users/by-id?id=2';
    return fetch(apiUrl).then((response) => response.json()).then(console.log("asd"));
  }

}
export default getUser;