// Dashboard Component

import Header from "../../components/Header/Header";
import Filter from '../../components/Filter/filter'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";

const API_URL_TASK: string = "http://localhost:3333/task"; // TODO:  Store this in .env file

interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    assignee: {
        displayName: string;
    };
    priorityLevel: string;
    notes: string[];
    status: string;
}

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get(API_URL_TASK)
            .then(res => setTasks(res.data))
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const getRowBackgroundColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return '#C8E6C9'; // light green
            case 'pending':
                return '#E0F7FA'; // light blue
            case 'in progress':
                return '#E1BEE7'; // light purple
            case 'cancelled':
                return '#FFCDD2'; // light red
            default:
                return undefined;
        }
    };

    const homeContentStyle = {
        marginTop: '90px',
    };

    const topBarStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '90px',
        marginBottom: '3rem'
    };


    return (
        <>
            <Header />
            <div style={homeContentStyle}>
                <Toolbar style={topBarStyle} >
                    <Typography variant="h5" style={{ fontFamily: "monospace" }}>All Available Tasks</Typography>
                    <Filter/>
                </Toolbar>
                

                <TableContainer >
                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '40px' }}>ID</TableCell>
                                <TableCell style={{ width: '200px' }}>Title</TableCell>
                                <TableCell style={{ width: '400px' }}>Description</TableCell>
                                <TableCell style={{ width: '100px' }}>Due Date</TableCell>
                                <TableCell style={{ width: '200px' }}>Assignee</TableCell>
                                <TableCell style={{ width: '160px' }}>Priority Level</TableCell>
                                <TableCell style={{ width: '400px' }}>Notes</TableCell>
                                <TableCell style={{ width: '100px' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task, index) => (
                                <TableRow key={index} style={{ backgroundColor: getRowBackgroundColor(task.status) }}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{task.title}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell>{task.dueDate.slice(0, 10)}</TableCell>
                                    <TableCell>{task.assignee?.displayName ?? 'Unassigned'}</TableCell>
                                    <TableCell>{task.priorityLevel}</TableCell>
                                    <TableCell>{(task.notes || []).join(', ')}</TableCell>
                                    <TableCell>{task.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default Dashboard;
