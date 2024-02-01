//filter 
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({ // Styled component to customize the Dialog component's styles
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


export default function CustomizedDialogs() { //customized dialog
    
    const [open, setOpen] = React.useState(false);// State hooks for dialog visibility and filter values
    const [filters, setFilters] = React.useState({
        priority: '',
        status: '',
        user: '',
    });

    
    const handleClickOpen = () => { // function to open the dialog
        setOpen(true);
    };

    
    const handleClose = () => { // function to close the dialog
        setOpen(false);
    };

    // function to handle changes in filter options
    const handleChange = (filterName: 'priority' | 'status' | 'user') => (event: SelectChangeEvent) => {
        setFilters({ ...filters, [filterName]: event.target.value });
    };

   
    const applyFilters = () => { // function to apply filters (currently just logs the filters to console)
        console.log(filters); //TODO:  fetch data from database , based on filters
        handleClose(); // close the dialog after applying filters
    };

    
    const clearFilters = () => { // function to clear all filter selections
        setFilters({
            priority: '',
            status: '',
            user: '',
        });
    };

    return (
        <>
            <Button onClick={handleClickOpen}>
                Filter
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
                PaperProps={{
                    style: {
                        width: '640px', // set the dialog width
                        height: '420px', // set the dialog height
                    },
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
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
                        >{/** temp data . TODO: make api call to get all users */}
                            <MenuItem value="User1">User1</MenuItem>
                            <MenuItem value="User2">User2</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-between' }}>
                    <Button onClick={clearFilters}>Clear Filters</Button>
                    <div>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={applyFilters}>Apply Filters</Button>
                    </div>
                </DialogActions>

            </BootstrapDialog>
        </>
    );
}
