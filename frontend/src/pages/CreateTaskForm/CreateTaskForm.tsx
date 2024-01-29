// TaskForm
import { Autocomplete, Button, FormGroup,TextField, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import { useEffect, useState } from 'react';



const CreateTaskForm = () => {
    // stores the tasks 
    // TODO:  The date should not be a date before the current date
    const userList = [{displayName : "Shawn"}, {displayName : "Amber"}, {displayName : "April"}];

    return (
        <>
            <Header />
            <h1>Create New Task</h1>
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
        </>
    );
}

export default CreateTaskForm;