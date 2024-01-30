// TaskForm
import { Autocomplete, Button, Card, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

const API_URL_USER: string = "http://localhost:3333/user/displayNames";

interface User {
    id: string;
    displayName: string;
}



const CreateTaskForm = () => {
    // TODO:  The date should not be a date before the current date

    const [users, setUsers] = useState<User[]>([]);
    const [priorityLevels, setPriorityLevels] = React.useState('Medium');


    const handlePriorityChange = (event: SelectChangeEvent) => { //  handles the priority changes 
        setPriorityLevels(event.target.value as string);
    };

    const handleFormCancel = () => {// handles cancel button press
        // navigate the the dashboard
        console.log('Cancel Button Clicked');
    };

    const handleCreateTask = () => {// handles create button press
        // make a post request to the server 
        console.log('Create Button Clicked');
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
                        <TextField fullWidth placeholder="Title" margin="normal" />
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <TextField fullWidth type="date" helperText="Due Date" margin="normal" />
                        <Autocomplete
                            disablePortal={false}
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
                            multiline
                            rows={4}
                            margin="normal"
                        />
                        <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                            <Grid item>
                                <Button variant="outlined" onClick={handleFormCancel}>Cancel</Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={handleCreateTask}>Create</Button>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}

export default CreateTaskForm;