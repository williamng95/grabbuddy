import React, { useState } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { getConfig } from "../config";
import Loading from "../components/Loading";
import  UpdateLimit  from "../components/UpdateLimit";
import UpdateRestriction from "../components/UpdateRestriction";

export const ExternalApiComponent = () => {

  return (
    <>
      <UpdateLimit />
      <UpdateRestriction />
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
