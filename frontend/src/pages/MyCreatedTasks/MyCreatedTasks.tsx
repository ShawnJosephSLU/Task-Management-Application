// MyCreatedTasks

import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import {
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    TableSortLabel
} from "@mui/material";
import Header from "../../components/Header/Header";
import Filter from '../../components/Filter/filter';

const API_URL_TASK: string = "http://localhost:3333/task"; // TODO: Store this in .env file

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

type SortableTaskKeys = keyof Pick<Task, 'title' | 'description' | 'dueDate' | 'priorityLevel' | 'status' | 'assignee'>;

const MyCreatedTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortConfig, setSortConfig] = useState<{ key: SortableTaskKeys, direction: 'asc' | 'desc' } | null>(null);

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
            case 'canceled':
                return '#FFCDD2'; // light red
            default:
                return undefined;
        }
    };

    const handleSort = (key: SortableTaskKeys) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedTasks = useMemo(() => {
        if (!sortConfig) {
            return tasks;
        }

        return [...tasks].sort((a, b) => {
            const aValue = sortConfig.key === 'assignee' ? a.assignee?.displayName ?? '' : a[sortConfig.key];
            const bValue = sortConfig.key === 'assignee' ? b.assignee?.displayName ?? '' : b[sortConfig.key];

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }, [tasks, sortConfig]);


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
                <Toolbar style={topBarStyle}>
                    <Typography variant="h5" style={{ fontFamily: "monospace" }}>My Created Tasks</Typography>
                    <Filter />
                </Toolbar>

                <TableContainer>
                    <Divider />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '40px' }}>ID</TableCell>
                                <TableCell style={{ width: '200px' }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'title'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('title')}
                                    >
                                        Title
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '400px' }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'description'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('description')}
                                    >
                                        Description
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '100px' }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'dueDate'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('dueDate')}
                                    >
                                        Due Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '200px' }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'assignee'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('assignee')}
                                    >
                                        Assignee
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '160px' }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'priorityLevel'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('priorityLevel')}
                                    >
                                        Priority Level
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell style={{ width: '400px' }}>Notes</TableCell>
                                <TableCell style={{ width: '100px' }}>
                                    <TableSortLabel
                                        active={sortConfig?.key === 'status'}
                                        direction={sortConfig?.direction || 'asc'}
                                        onClick={() => handleSort('status')}
                                    >
                                        Status
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>
                            {sortedTasks.map((task, index) => (
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

export default MyCreatedTasks;