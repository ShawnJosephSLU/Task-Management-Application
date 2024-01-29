// Dashboard Component

import Header from "../../components/Header/Header"
import { useEffect, useState } from 'react';

import axios from 'axios';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

const API_URL : string = "http://localhost:3333/task"; // TODO:  Store this in .env file

interface Task {
    id: string; // Assuming the id is a string. Adjust the type accordingly.
    title: string;
    description: string;
    dueDate: string; // Adjust the type if your date is a Date object
    assignee: {
        displayName: string;
    };
    priorityLevel: string;
    notes: string[]; // Assuming notes is an array of strings
    status: string;
}


const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setTasks(res.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []); // Empty dependency array to run only on component mount

    return (
        <>
            <Header/>
            
            <div>
                <Typography variant="h4">Tasks</Typography>
                <button>Sort</button>
                <button>Filter</button>
                <TableContainer >
                    <Table>
                        <TableHead component={Paper}>
                            <TableRow>
                                <TableCell style={{ width: '40px' }}><h4>ID</h4></TableCell>
                                <TableCell style={{ width: '100px' }}><h4>Title</h4></TableCell>
                                <TableCell style={{ width: '400px' }}><h4>Description</h4></TableCell>
                                <TableCell style={{ width: '100px' }}><h4>Due Date</h4></TableCell>
                                <TableCell style={{ width: '200px' }}><h4>Assignee</h4></TableCell>
                                <TableCell style={{ width: '160px' }}><h4>Priority Level</h4></TableCell>
                                <TableCell style={{ width: '400px' }}><h4>Notes</h4></TableCell>
                                <TableCell style={{ width: '100px' }}><h4>Status</h4></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                           {
                                tasks.map((task, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.description}</TableCell>
                                        <TableCell>{task.dueDate.slice(0, 10)}</TableCell>
                                        <TableCell>{task.assignee.displayName}</TableCell>
                                        <TableCell>{task.priorityLevel}</TableCell>
                                        <TableCell>{task.notes}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default Dashboard