// UserSignInForm

//TODO: Handle Authentication when signing in
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";


const UserSignInForm = () => {
    return (
        <>
           <div> 
            <h1>TO DO LIST</h1>
            <h3>Sign In</h3>
                <form>
                    <input placeholder="username or email" type="email" />
                    <input placeholder="password" type="password" />
                    <NavLink to="/dashboard"><Button>Sign In</Button></NavLink>
                    <p>Don't have an account ?</p>
                    <NavLink to="/signup"><Button>Sign Up</Button></NavLink>
                    
                </form>
            </div>
        </>
    );
}

export default UserSignInForm;