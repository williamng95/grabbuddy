import React, { Fragment } from "react";

import Hero from "../components/HomeHero";
import Content from "../components/Content";
import { useAuth0 } from "@auth0/auth0-react";

import WalletCardEthers from'../components/WalletCardEthers';

const Home = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  return (
  (!isAuthenticated)? loginWithRedirect() : (
  <Fragment>
    <WalletCardEthers/>
    <Hero />
    <Content />
  </Fragment>
    )
);
}

export default Home;
