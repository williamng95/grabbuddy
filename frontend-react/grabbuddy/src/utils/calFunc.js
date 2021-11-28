function calculateTotal(data){
    let total = 0;
    for(var i=0;i<data.length;i++){
      total += data[i].transaction_amount;
    }

    return total;
  }
  
  
  function  calculateGameTotal(){
    let total = 0;
    for(var i=0;i<this.state.transactionData.length;i++){
      if(this.state.transactionData[i].category=="GAME")
      total += this.state.transactionData[i].transaction_amount;
    }

    return total;
  }
  
  function  calculateFoodTotal(){
    let total = 0;
    for(var i=0;i<this.state.transactionData.length;i++){
      if(this.state.transactionData[i].category=="FOOD")
      total += this.state.transactionData[i].transaction_amount;
    }
    return total;
  }