//filter 

import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface User {
    id: string;
    displayName: string;
}

const API_URL_USER = "http://localhost:3333/user/displayNames";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function CustomizedDialogs() {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
        priority: '',
        status: '',
        user: '',
    });
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        axios.get(API_URL_USER)
            .then(response => {
                setUsers(response.data); 
            })
            .catch(error => {
                console.error('There was an error fetching the users!', error);
            });
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (filterName: keyof typeof filters) => (event: SelectChangeEvent) => {
        setFilters({ ...filters, [filterName]: event.target.value });
    };

    const applyFilters = () => {
        console.log(filters);
        handleClose();
    };

    const clearFilters = () => {
        setFilters({
            priority: '',
            status: '',
            user: '',
        });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Filter
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{
                    style: {
                        width: '640px',
                        maxHeight: '80vh',
                    },
                }}
            >
                <DialogTitle id="customized-dialog-title" sx={{ m: 0, p: 2 }}>
                    Filter Options
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={filters.priority}
                            label="Priority"
                            onChange={handleChange('priority')}
                        >
                            <MenuItem value="Low">Low</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="High">High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.status}
                            label="Status"
                            onChange={handleChange('status')}
                        >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                            <MenuItem value="InProgress">In Progress</MenuItem>
                            <MenuItem value="Canceled">Canceled</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>User</InputLabel>
                        <Select
                            value={filters.user}
                            label="User"
                            onChange={handleChange('user')}
                        >
                            {users.map((user) => (
                                <MenuItem key={user.id} value={user.id}>{user.displayName}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-between' }}>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                    <div>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button color="primary" onClick={applyFilters}>Apply Filters</Button>
                    </div>
                </DialogActions>
            </BootstrapDialog>
        </>
    );
}

