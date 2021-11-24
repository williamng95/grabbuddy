import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();
  return (
  (!isAuthenticated)? loginWithRedirect() : (
  <Fragment>
    <Hero />
    <Content />
  </Fragment>
    )
);
}

export default Home;
