

export const getTransactions = (data) => {
  return fetch('https://api-test-buddy.glitch.me/api/transactions/all')
   .then(response => response.json())
   .then((data) => {
     return data  //instead of `response.json()` return data directly
     console.log("DATA RETURN");
   })
}



