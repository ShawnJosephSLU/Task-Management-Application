// TaskForm
import Header from "../../components/Header/Header";

const CreateTaskForm = () => {
    // stores the tasks 
 

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
                        <input  type="date" />
                    </div>
                    
                    <button type="submit">Cancel</button>
                    <button type="submit">Create</button>
            </form>
        </>
    );
}

export default CreateTaskForm;