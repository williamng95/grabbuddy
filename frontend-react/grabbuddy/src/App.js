import React, { useState, useEffect  } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import balance from "./views/balance";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {

  const [user1, setUser] = useState(null);

  // + adding the use
useEffect(() => {
  getData();

  // we will use async/await to fetch this data
  async function getData() {
    const response = await fetch("https://api-test-buddy.glitch.me/api/users/by-id?id=1");
    const data = await response.json();

    // store the data into our books variable
    setUser(data) ;
  }
}, []);


  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar  />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/balance" component={balance} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
