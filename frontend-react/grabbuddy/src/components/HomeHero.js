import React from "react";
import logo from "../assets/Grab.svg";
import avatar from "../assets/avatar_512x512.png";
import { useAuth0 } from "@auth0/auth0-react";


const Hero = () => {
  const {
    user,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  return(
  <div className="text-center hero p-5" style={{"maxWidth":"100%"}}>
    {/* <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">Grab Buddy</h1>

    <p className="lead">
      This is a sample application that demonstrates an authentication flow for
      an SPA, using <a href="https://reactjs.org">React.js</a>
    </p> */}

  {isAuthenticated && (

      <div className="container-fluid">
      <div className="d-flex flex-row justify-content-center mx-auto">
        <div className="d-flex flex-column justify-content-center p-2" style={{gap: "1rem"}}>
          <img className="align-self-end filter-white" src={avatar} width="250rem" alt="Avatar"/>
        </div>
        <div className="d-flex flex-column justify-content-flex-end align-self-end p-2 w-100 text-right"  style={{gap: "1rem"}}>
          
          <h1 className="p-2 text-light">Hi {user.name.toString()} !</h1>
          <img className="align-self-end filter-white" src={logo} width="400em" alt="Grab Logo"/>
          <h2 className="p-2 text-light">Next top up is on { new Date(user.updated_at).toLocaleDateString()/* replace this with top-up date */}</h2> 
        </div>
      </div>
    </div>

  )}

  </div>


);
}

export default Hero;
