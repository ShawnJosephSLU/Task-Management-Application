// TaskForm
import { Autocomplete, Button, Card, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const API_URL_USER: string = "http://localhost:3333/user/displayNames";

interface User {
    id: string;
    displayName: string;
}

const CreateTaskForm = () => {
    // TODO:  The date should not be a date before the current date

    const [users, setUsers] = useState<User[]>([]);
    
    const [priorityLevels, setPriorityLevels] = React.useState('Medium');

    const currentDate = new Date();
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        dueDate: currentDate.toLocaleDateString('en-US'), // current date by default
        priority: "Medium",
        assignee: "", // TODO: by default the current user should assign the task to himself
        note: ""
    });


    const handlePriorityChange = (event: SelectChangeEvent) => {
        const newPriority = event.target.value;
        setPriorityLevels(newPriority);
        setNewTask({ ...newTask, priority: newPriority });
    };


    const handleAssigneeChange = (_event: any, value: User | null) => {
        setNewTask({ ...newTask, assignee: value ? value.id : "" });
    };
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };


    const handleSubmit = () => {// handles create button press
        // make a post request to the server 
        console.log('Create Button Clicked');
        console.log(newTask);
    };


    useEffect(() => {
        axios.get(API_URL_USER)
            .then(res => setUsers(res.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    const assignees = users; // store user displayNames inside this variable

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
                            disablePortal={false}
                            onChange={handleAssigneeChange}
                            id="combo-box-demo"
                            options={assignees}
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
                            name="note"
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