
import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  
  <Auth0Provider
    domain={process.env.REACT_APP_AUTHURL}
    clientId={process.env.REACT_APP_AUTHCLIENT}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_APIAUDIENCE}
  >
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
