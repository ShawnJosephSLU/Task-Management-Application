// MyCreatedTasks

import Header from "../../components/Header/Header";

const MyCreatedTasks = () => {

    const myCreatedTasksStyle = { 
        marginTop: '90px', 
      };

    return (
        <>
            <Header/>
            <div style={myCreatedTasksStyle}>
                <h1>My Created Tasks</h1>
                <div>
                    <h3>Tasks</h3>
                    <button>Sort</button>
                    <button>Filter</button>
                </div>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Assignee</th>
                        <th>Priority</th>
                        <th>Notes</th>
                        <th>Due Date</th>
                        <th>Status</th>
                    </tr>
                </table>
            </div>   
        </>
    );
}

export default MyCreatedTasks;