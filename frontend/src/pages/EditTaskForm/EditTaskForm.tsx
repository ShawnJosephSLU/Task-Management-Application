// Edit Task Form

import { Autocomplete, Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../../components/Header/Header";

const API_URL_USER: string = "http://localhost:3333/user/displayNames";
const API_URL_TASK: string = "http://localhost:3333/task";

interface User {
    id: string;
    displayName: string;
}

interface Task {
    title: string;
    description: string;
    dueDate: string;
    priorityLevel: string;
    assignee: {
        userId: string;
        displayName: string;
    };
    notes: string;
    status: string;
}

const EditTask: React.FC = () => {
    const navigate = useNavigate();
    const taskId = localStorage.getItem('taskId'); // gets the task's id from local storage
    const token = localStorage.getItem('authToken'); // gets the token from local storage
    const taskUrl = `${API_URL_TASK}/${taskId}`;
   
    const [priorityLevels, setPriorityLevels] = useState('');
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState<User[]>([]);
    const currentDate = new Date().toISOString().split('T')[0];

    const [newTask, setNewTask] = useState<Task>({
        title: "",
        description: "",
        dueDate: "",
        priorityLevel: "",
        assignee: { userId: "", displayName: "" },
        notes: "",
        status: ""
    });


    
    const handlePriorityChange = (event: SelectChangeEvent) => {
        const newPriority = event.target.value;
        setPriorityLevels(priorityLevels);
        setNewTask({ ...newTask, priorityLevel: newPriority });
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        const newStatus = event.target.value;
        setStatus(status);
        setNewTask({ ...newTask, status: newStatus });
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
        navigate('/mytasks');
    };

    const updateTask = () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error('No token found in local storage.');
            navigate('/signin');
            return;
        }

        axios.patch(taskUrl, newTask, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
                navigate('/mytasks');
            })
            .catch(error => {
                console.error('There was an error updating the task', error);
            });
    };

    useEffect(() => {
        
    if (!token) {// check if the token does not exist

      
      navigate("/signin"); // if the token is not there , navigate
    }
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_URL_USER);
                setUsers(response.data);
            } catch (error) {
                console.error('There was an error fetching users!', error);
            }
        };

        fetchUsers();

        const populateFields = async () => {
            

            if (!taskId || !token) {
                console.error('Task ID or token is missing');
                navigate('/signin');
                return;
            }

            

            try {
                const response = await axios.get(taskUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}` // Correctly include the token in the Authorization header
                    }
                });

                const taskData = response.data;
                setNewTask({
                    title: taskData.title,
                    description: taskData.description,
                    dueDate: taskData.dueDate.split('T')[0],
                    priorityLevel: taskData.priorityLevel,
                    assignee: taskData.assignee,
                    notes: taskData.notes,
                    status: taskData.status
                });
            } catch (error) {
                console.error('There was an error fetching the task', error);
                navigate('/signin');
            }
        };

        populateFields();
    }, [navigate]);


    return (
        <>
        <Header />
        <Grid container justifyContent="center" style={{ marginTop: '90px' }}>
            <Grid item xs={12} md={6}>
                <Card sx={{ p: 3 }}>
                    <Typography variant="h5" style={{ fontFamily: "monospace", textAlign: 'center' }}>
                        Edit Task
                    </Typography>
                    <TextField
                        fullWidth
                        label="Title"
                        name="title"
                        value={newTask.title}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        value={newTask.description}
                        rows={4}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        type="date"
                        label="Due Date"
                        value={newTask.dueDate}
                        name="dueDate"
                        onChange={handleChange}
                        margin="normal"
                        inputProps={{ min: currentDate }}
                    />
                    <Autocomplete
                        options={users}
                        getOptionLabel={(option) => option.displayName}
                        onChange={handleAssigneeChange}
                        renderInput={(params) => <TextField {...params} label="Assignee" margin="normal" />}
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="priority-level-label">Priority Level</InputLabel>
                        <Select
                            labelId="priority-level-label"
                            id="priority-level-select"
                            value={newTask.priorityLevel}
                            label="Priority Level"
                            onChange={handlePriorityChange}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Notes"
                        name="notes"
                        multiline
                        value={newTask.notes}
                        rows={4}
                        onChange={handleChange}
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                           labelId="status-label"
                           id="priority-level-select"
                           value={newTask.status}
                           label="Status"
                           onChange={handleStatusChange}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                            <MenuItem value="in progress">In Progress</MenuItem>
                            <MenuItem value="canceled">Canceled</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 2 }}>
                        <Grid item>
                            <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={updateTask}>Update</Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        </Grid>
    </>
    );
}

export default EditTask;
