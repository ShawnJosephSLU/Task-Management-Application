import Header from "../../components/Header/Header"

// Dashboard Component
const Dashboard = () => {
    return (
        <>
            <Header/>
            <h1>Dashboard</h1>
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
        </>
    );
}

export default Dashboard