import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import MyCreatedTasks from './components/MyCreatedTasks/MyCreatedTasks'
import NewUserForm from './components/NewUserForm/NewUserForm'
import TaskForm from './components/TaskForm/TaskForm'
import UserSignInForm from './components/UserSignInForm/UserSignInForm'

function App() {
    return (
    <>
        <Dashboard/>
        <NewUserForm/>
        <UserSignInForm/>
        <TaskForm/>
        <MyCreatedTasks/>
    </>
  )
}

export default App
