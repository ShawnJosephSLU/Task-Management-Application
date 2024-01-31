// UserSignInForm

//TODO: Handle Authentication when signing in
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, Grid, TextField, Typography, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const UserSignInForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior
        // TODO: Add your sign-in logic here
        // If sign-in is successful:
        navigate('/dashboard');
    };

    const onSignUpBtnClicked = () => {
        navigate('/signup');
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh', background: 'your-background-style' }}>
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h4" textAlign="center" gutterBottom>TO DO LIST</Typography>
                        <Typography variant="h6" textAlign="center" gutterBottom>Sign In</Typography>
                        <form onSubmit={handleSignIn}>
                            <TextField
                                fullWidth
                                margin="normal"
                                placeholder="Username or Email"
                                type="text"  // Changed from email to text
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                margin="normal"
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={togglePasswordVisibility}>
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button type="submit"
                                fullWidth variant="contained"
                                color="primary"
                                style={{ marginTop: '20px' }}
                            >
                                Sign In
                            </Button>

                            <Typography textAlign="center" style={{ marginTop: '20px' }}>
                                Don't have an account?
                            </Typography>

                            <Button onClick={onSignUpBtnClicked} fullWidth variant="outlined" style={{ marginTop: '10px' }}>
                                Sign Up
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default UserSignInForm;
