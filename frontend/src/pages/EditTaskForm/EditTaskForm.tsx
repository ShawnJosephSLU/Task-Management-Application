// Edit Task Form

import { Autocomplete, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const API_URL_USER: string = "http://localhost:3333/user/displayNames";
const API_URL_TASK: string = "http://localhost:3333/task";

interface User {
    id: string;
    displayName: string;
}

const  EditTask = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [priorityLevels, setPriorityLevels] = useState('Medium');
    const currentDate = new Date().toISOString().split('T')[0];

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: currentDate,
        priorityLevel: "Medium",
        assignee: { userId: "", displayName: "" },
        notes: "",
    });

    useEffect(() => {
        axios.get(API_URL_USER)
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    const handlePriorityChange = (event: SelectChangeEvent) => {
        const newPriority = event.target.value;
        setPriorityLevels(newPriority);
        setNewTask({ ...newTask, priorityLevel: newPriority });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };

    const handleAssigneeChange = (_event: any, value: User | null) => {
        setNewTask({
            ...newTask,
            assignee: {
                userId: value ? value.id : "",
                displayName: value ? value.displayName : ""
            }
        });
    };

    // handle cancel
    const handleCancel = () => {
        navigate('/dashboard');
    };

    const handleSubmit = () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found in local storage.');
            navigate('/signin');
            return;
        }

        axios.post(API_URL_TASK, newTask, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                navigate('/dashboard');
            })
            .catch(error => {
                console.error('There was an error submitting the task', error);
            });
    };


    return (
        <>
            <Header />
            <Grid container justifyContent="center" style={{ marginTop: '90px' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h5" style={{ fontFamily: "monospace", textAlign: 'center' }}>Edit Task</Typography>

                        <TextField
                            fullWidth
                            placeholder="Title"
                            name="title"
                            value={newTask.title}
                            onChange={handleChange}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            margin="normal"
                            onChange={handleChange}
                        />
                        <TextField
                            fullWidth
                            type="date"
                            helperText="Due Date"
                            name="dueDate"
                            onChange={handleChange}
                            margin="normal"
                            inputProps={{ min: currentDate }}

                        />
                        <Autocomplete
                            disablePortal
                            onChange={handleAssigneeChange}
                            id="combo-box-demo"
                            options={users}
                            getOptionLabel={(option) => option.displayName}
                            sx={{ width: '100%', marginTop: 2 }}
                            renderInput={(params) => <TextField {...params} label="Assignee" />}
                        />
                        <FormControl fullWidth sx={{ marginTop: 4 }}>
                            
                        <InputLabel id="demo-simple-select-autowidth-label">Priority Level</InputLabel>
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priorityLevels}
                                label="Priority Level"
                                onChange={handlePriorityChange}
                                
                            >
                                <MenuItem value={"Low"}>Low</MenuItem>
                                <MenuItem value={"Medium"}>Medium</MenuItem>
                                <MenuItem value={"High"}>High</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Notes"
                            name="notes"
                            multiline
                            rows={4}
                            margin="normal"
                            onChange={handleChange}
                            sx={{ marginTop: 3 }}
                        />
                        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                            <Grid item>
                                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handleSubmit}>Create</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default EditTask;
