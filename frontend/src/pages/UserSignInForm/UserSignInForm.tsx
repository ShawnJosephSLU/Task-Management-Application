// UserSignInForm

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import axios from "axios";

const SIGNIN_ENDPOINT = "http://localhost:3333/user/signin"; // Backend sign in endpoint. TODO: save in a .env file

const UserSignInForm = () => {
    const navigate = useNavigate(); 
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

   
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if all fields are filled
        if (!credentials.email || !credentials.password) {
            setErrorMessage("All fields must be filled");
            return; // Stop the sign-in process if fields are empty
        }

        try {
            const response = await axios.post(SIGNIN_ENDPOINT, credentials);
            console.log("Login successful:", response.data);

            // After successful authentication in your login flow
            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("displayName", response.data.user.displayName);
            localStorage.setItem("_id", response.data.user._id);

            navigate("/dashboard"); // Redirect to dashboard
            setErrorMessage(""); // Clear any error messages on successful login
        } catch (error: any) {
            if (error.response) {
                
                setErrorMessage("Incorrect username or password");// If the server sends a response with an error
            } else {
                // For other errors like network errors, etc.
                setErrorMessage("An error occurred. Please try again later.");
            }
        }
    };

    const onSignUpBtnClicked = () => {
        navigate("/signup");
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh", background: "your-background-style" }}
        >
            <Grid item xs={12} sm={6} md={4}>
                <Card>
                    <CardContent>
                        <Typography
                            variant="h4"
                            textAlign="center"
                            gutterBottom
                        >
                            Task Manager
                        </Typography>
                        <Typography
                            variant="h6"
                            textAlign="center"
                            gutterBottom
                        >
                            Sign In
                        </Typography>
                        <form onSubmit={handleSignIn}>
                            {errorMessage && (
                                <Typography
                                    color="error"
                                    textAlign="center"
                                    style={{ marginTop: "10px" }}
                                >
                                    {errorMessage}
                                </Typography>
                            )}
                            <TextField
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="Email"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                name="password" 
                                value={credentials.password}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="Password"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            >
                                                {showPassword ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "20px" }}
                            >
                                Sign In
                            </Button>

                            <Typography
                                textAlign="center"
                                style={{ marginTop: "20px" }}
                            >
                                Don't have an account?
                            </Typography>

                            <Button
                                onClick={onSignUpBtnClicked}
                                fullWidth
                                variant="outlined"
                                style={{ marginTop: "10px" }}
                            >
                                Sign Up
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default UserSignInForm;
