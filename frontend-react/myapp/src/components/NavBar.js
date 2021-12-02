import { LoginButton, LogoutButton } from "./authButtons";
import { useAuth0 } from "@auth0/auth0-react";

function NavBar(){
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <div className="container">
            </div>
            <div className="d-flex justify-content-end">
                {!isAuthenticated && (<LoginButton  />)}
                {isAuthenticated && (<LogoutButton />)} 
            </div>
            
        </div>
        </nav>
         

    )
}

export default NavBar