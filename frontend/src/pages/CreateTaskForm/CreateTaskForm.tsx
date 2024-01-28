// TaskForm

import Header from "../../components/Header/Header";

const CreateTaskForm = () => {
    return (
        <>
            <Header/>
            <h1>Create New Task</h1>
            <form>
                    <input placeholder="Title" type="text" />
                    <input placeholder="Description" type="" />
                    <input placeholder="Assignee" type="text" />
                    <div>
                        <p>Notes</p>
                        <input placeholder="Enter a Note" type="text" />
                        
                    </div>
                    <div>
                        <p>Due Date</p>
                        <div>
                            <p>Day</p>
                            <input  type="date" />
                        </div>
                        <div>
                            <p>Time</p>
                            <input  type="time" />
                        </div>
                    </div>
                    
                    <button type="submit">Cancel</button>
                    <button type="submit">Create</button>
                </form>
        </>
    );
}

export default CreateTaskForm;