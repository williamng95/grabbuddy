import React, { Fragment } from "react";

import BalanceHero from "../components/BalanceHero";
import BalanceContent from "../components/BalanceContent";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();
  return (
  (!isAuthenticated)? loginWithRedirect() : (
  <Fragment>
    <BalanceHero />
    <BalanceContent />
  </Fragment>
    )
);
}

export default Home;
