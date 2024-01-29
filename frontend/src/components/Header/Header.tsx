// Header

import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <AppBar>
            <Toolbar style={{ justifyContent: 'space-between' }}>

                <Typography variant="h5" fontFamily="fantasy" noWrap>
                    TODO LIST
                </Typography>

                <div style={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                    <NavLink to="/dashboard"><Button style={{ color: '#ffffff' }}>Home</Button></NavLink>
                    <NavLink to='/mytasks'><Button style={{ color: '#ffffff' }}>My Created Tasks</Button></NavLink>
                    <NavLink to='/create-task'><Button style={{ color: '#ffffff' }}>Create New Task</Button></NavLink>
                </div>

                <NavLink to='/signin'><Button style={{ color: '#ffffff' }}>Sign Out</Button></NavLink>

            </Toolbar>
        </AppBar>
    );
}

export default Header;

