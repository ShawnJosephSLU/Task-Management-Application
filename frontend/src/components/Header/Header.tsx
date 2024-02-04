// Header

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
    const navigate = useNavigate();

    const navigateToDashboard = () => { //  navigates the user to the dashboard
        navigate('/dashboard');
    }

    const navigateToMyTasks = () => { // navigates the user to their created tasks
        navigate('/mytasks');
    };

    const navigateToNewTaskForm = () => { //  navigates the user to the new Task for
        navigate('/create-task');
    };

    const handleSignOut = () => {
        const SIGNOUT_ENDPOINT = "http://localhost:3333/user/signout";
        const token = localStorage.getItem('authToken');
    
        try {
            axios.post(SIGNOUT_ENDPOINT, {}, { // add the token to a blacklist 
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
            .then(response => {
                // Handle successful sign out
                console.log('Sign out successful', response.data);
                localStorage.removeItem('authToken'); // Deletes the auth token upon successful sign out
                navigate('/signin'); // Redirect the user to the sign-in page
            })
            .catch(error => {
                // Handle errors if the request failed
                console.error('Error during sign out', error.response);
            });
        } catch (error) {
            // Handle errors that may occur outside the request, if any
            console.error('Unexpected error', error);
        }
    };
    

    const displayName = localStorage.getItem('displayName')

    return (
        <AppBar>
            <Toolbar style={{ justifyContent: 'space-between' }}>

                <Typography variant="h5" > {displayName} </Typography>

                <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <Button onClick={navigateToDashboard} style={{ color: '#ffffff' }}>Home</Button>
                    <Button onClick={navigateToMyTasks} style={{ color: '#ffffff' }}>My Tasks</Button>
                    <Button onClick={navigateToNewTaskForm} style={{ color: '#ffffff' }}>Create New Task</Button>
                </div>

                <Button onClick={handleSignOut} style={{ color: '#ffffff' }}>Sign Out</Button>

            </Toolbar>
        </AppBar>
    );
}

export default Header;

