//import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import MyCreatedTasks from './pages/MyCreatedTasks/MyCreatedTasks'
import NewUserForm from './pages/NewUserForm/NewUserForm'
import CreateTaskForm from './pages/CreateTaskForm/CreateTaskForm'
import UserSignInForm from './pages/UserSignInForm/UserSignInForm'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import EditTaskForm from './pages/EditTaskForm/EditTaskForm'


function App() {

  let isUserSignedIn : boolean = false; // todo: handle user sign in
  

    return (
      // if the user is logged in, the index page is Dashboard. Otherwise it is the sign in page
    <BrowserRouter>
      <Routes>
          <Route path="/" element={isUserSignedIn ? <Dashboard /> : <Navigate to="/signin" replace />} />
          <Route path="/signin" index element={<UserSignInForm/>}/>
          <Route path="/" index element={<UserSignInForm/>}/>
          <Route path="/dashboard"  element={<Dashboard/>}/>
          <Route path="/signup"  element={<NewUserForm/>}/>
          <Route path="/create-task"  element={<CreateTaskForm/>}/>
          <Route path="/edit-task"  element={<EditTaskForm/>}/>
          <Route path="/mytasks"  element={<MyCreatedTasks/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
