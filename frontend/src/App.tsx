//import './App.css'
import MyCreatedTasks from "./pages/MyTodos/MyTodos";
import NewUserForm from "./pages/NewUserForm/NewUserForm";
import CreateTaskForm from "./pages/CreateTaskForm/CreateTaskForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EditTaskForm from "./pages/EditTaskForm/EditTaskForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserSignInForm from "./pages/UserSignInForm/UserSignInForm";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<UserSignInForm />} />
                <Route path="/signin" element={<UserSignInForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<NewUserForm />} />
                <Route path="/create-task" element={<CreateTaskForm />} />
                <Route path="/edit-task" element={<EditTaskForm />} />
                <Route path="/mytasks" element={<MyCreatedTasks />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
