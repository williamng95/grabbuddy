import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className = "btn btn-primary" onClick={() => loginWithRedirect()}>Log In</button>;
};

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className = "btn btn-primary" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

