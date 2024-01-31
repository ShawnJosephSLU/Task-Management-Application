import { Autocomplete, Button, Card, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";


const API_URL_USER: string = "http://localhost:3333/user/displayNames";
const API_URL_TASK: string = "http://localhost:3333/task";

interface User {
    id: string;
    displayName: string;
}

const CreateTaskForm = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [priorityLevels, setPriorityLevels] = useState('Medium');
    const currentDate = new Date();

    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: currentDate.toLocaleDateString('en-US'),
        priorityLevel: "Medium",
        assignee: "",
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
        setNewTask({ ...newTask, assignee: value ? value.id : "" });
    };

    const handleSubmit = () => {
        // Check if any required fields are empty
        if (!newTask.title || !newTask.description || !newTask.dueDate || !newTask.assignee) {
            alert("All fields must be filled");
            return; // Prevents the function from proceeding further
        }
    
        
        axios.post(API_URL_TASK, newTask) // If validation passes, proceed to making  the post request
            .then(response => {
                console.log('Task Created:', response.data);
                navigate('/dashboard'); // Navigate to the dashboard
            })
            .catch(error => {
                console.error('Error Response:', error.response);
                console.error('Error Data:', error.response.data);
            });
    };
    

    return (
        <>
            <Header />
            <Grid container justifyContent="center" style={{ marginTop: '90px' }}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h5" style={{ fontFamily: "monospace", textAlign: 'center' }}>Create A New Task</Typography>
                        
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
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={priorityLevels}
                            label="Priority Level"
                            onChange={handlePriorityChange}
                            sx={{ marginTop: 2 }}
                        >
                            <MenuItem value={"Low"}>Low</MenuItem>
                            <MenuItem value={"Medium"}>Medium</MenuItem>
                            <MenuItem value={"High"}>High</MenuItem>
                        </Select>
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Notes"
                            name="notes"
                            multiline
                            rows={4}
                            margin="normal"
                            onChange={handleChange}
                        />
                        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                            <Grid item>
                                <NavLink to="/dashboard">
                                    <Button variant="outlined">Cancel</Button>
                                </NavLink>
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

export default CreateTaskForm;
