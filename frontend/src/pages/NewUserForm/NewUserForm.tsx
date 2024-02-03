// NewUserForm

import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

const SIGNUP_ENDPOINT = "http://localhost:3333/user/signup"; // Backend sign in endpoint. TODO: save in a .env file

const NewUserForm = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        retypePassword: "",
    });

    const [errorMessage, setErrorMessage] = useState(""); // this state holds the error message

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleSignUp = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Check if all fields are filled
        if (
            !data.firstName ||
            !data.lastName ||
            !data.username ||
            !data.email ||
            !data.password ||
            !data.retypePassword
        ) {
            setErrorMessage("All fields must be filled");
            return; // Stop the sign-up process if fields are empty
        }

        // Check if passwords match
        if (data.password !== data.retypePassword) {
            setErrorMessage("Passwords do not match");
            return; // Stop the sign-up process if passwords don't match
        }

        // Construct the displayName and the payload
        const displayName = `${data.firstName} ${data.lastName}`;
        const payload = {
            displayName: displayName,
            username: data.username,
            email: data.email,
            password: data.password,
        };

        try {
            const response = await axios.post(SIGNUP_ENDPOINT, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Sign Up successful:", response.data);
                // Redirect user to sign-in page after successful sign-up
                navigate("/signin");
                setErrorMessage(""); // Clear any error messages on successful sign up
            } else {
                // Handle any other status codes appropriately
                setErrorMessage(
                    "An unexpected error occurred. Please try again."
                );
            }
        } catch (error) {
            // Handle errors that occur during the axios request
            console.error("Sign Up failed:", error);
            setErrorMessage("Sign Up failed. Please try again.");
        }
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
                            TO DO LIST
                        </Typography>
                        <Typography
                            variant="h6"
                            textAlign="center"
                            gutterBottom
                        >
                            Create New User
                        </Typography>
                        <form onSubmit={handleSignUp}>
                            <TextField
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="First Name"
                                type="text"
                            />
                            <TextField
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="Last Name"
                                type="text"
                            />
                            <TextField
                                name="username"
                                value={data.username}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="username"
                                type="username"
                            />
                            <TextField
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="Email"
                                type="email"
                            />
                            <TextField
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="Password"
                                type="password"
                            />
                            <TextField
                                name="retypePassword"
                                value={data.retypePassword}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                placeholder="Retype Password"
                                type="password"
                            />
                            {errorMessage && (
                                <Typography color="error" textAlign="center">
                                    {errorMessage}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                style={{ marginTop: "20px" }}
                            >
                                Sign Up
                            </Button>
                            <Typography
                                textAlign="center"
                                style={{ marginTop: "20px" }}
                            >
                                Already have an account?
                            </Typography>
                            <Button
                                fullWidth
                                variant="outlined"
                                style={{ marginTop: "10px" }}
                                onClick={() => navigate("/signin")}
                            >
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
