// TaskForm
import { Autocomplete, Button, FormGroup, TextField, Toolbar, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
//import { useEffect, useState } from 'react';



const CreateTaskForm = () => {
    // stores the tasks 
    // TODO:  The date should not be a date before the current date
    const userList = [{ displayName: "Shawn" }, { displayName: "Amber" }, { displayName: "April" }];

    const createNewTaskStyle = {
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
            <div style={createNewTaskStyle}>
            <Toolbar style={topBarStyle} >
                    
                    <Typography variant="h5" style={{fontFamily: "monospace"}}>Create A New Task</Typography>
                    </Toolbar>
    
                <FormGroup>
                    <TextField placeholder="Title" type="text" />
                    <TextField placeholder="Description" type="" />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={userList}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Assignee" />}
                    />
                    <TextField placeholder="Enter a Note" type="text" />

                    <Typography>Due Date</Typography>
                    <TextField type="date" />

                    <div>
                        <Button type="submit">Cancel</Button>
                        <Button type="submit">Create</Button>
                    </div>

                </FormGroup>
            </div>

        </>
    );
}

export default CreateTaskForm;