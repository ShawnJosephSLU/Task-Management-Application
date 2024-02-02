// Header

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

    const handleSignOut = () => { // handles the user sign out

        //TODO: Sign user out successfully before navigating away
        navigate('/signin');
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
                    <Button onClick={navigateToNewTaskForm} style={{ color: '#ffffff' }}>Notifications</Button>

                </div>

                <Button onClick={handleSignOut} style={{ color: '#ffffff' }}>Sign Out</Button>

            </Toolbar>
        </AppBar>
    );
}

export default Header;

