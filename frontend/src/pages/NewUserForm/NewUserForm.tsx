// NewUserForm

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";

const NewUserForm = () => {
    const navigate = useNavigate();

    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        // TODO: Add your signup logic here

        // After successful signup, navigate to the sign-in page
        navigate('/signin');
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', background: 'your-background-style' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" textAlign="center" gutterBottom>TO DO LIST</Typography>
                        <Typography variant="h6" textAlign="center" gutterBottom>Create New User</Typography>
                        <form onSubmit={handleSignUp}>
                            <TextField fullWidth margin="normal" placeholder="First Name" type="text" />
                            <TextField fullWidth margin="normal" placeholder="Last Name" type="text" />
                            <TextField fullWidth margin="normal" placeholder="Username" type="text" />
                            <TextField fullWidth margin="normal" placeholder="Email" type="email" />
                            <TextField fullWidth margin="normal" placeholder="Password" type="password" />
                            <TextField fullWidth margin="normal" placeholder="Retype Password" type="password" />
                            <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                Sign Up
                            </Button>
                            <Typography textAlign="center" style={{ marginTop: '20px' }}>
                                Already have an account?
                            </Typography>
                            <Button fullWidth variant="outlined" style={{ marginTop: '10px' }} onClick={() => navigate('/signin')}>
                                Sign In
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default NewUserForm;
