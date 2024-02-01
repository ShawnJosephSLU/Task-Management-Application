//import './App.css'
import MyCreatedTasks from './pages/MyCreatedTasks/MyCreatedTasks';
import NewUserForm from './pages/NewUserForm/NewUserForm';
import CreateTaskForm from './pages/CreateTaskForm/CreateTaskForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EditTaskForm from './pages/EditTaskForm/EditTaskForm';
import { AuthProvider } from './contexts/AuthContext/AuthContext';
import Dashboard from './pages/Dashboard/Dashboard';
import UserSignInForm from './pages/UserSignInForm/UserSignInForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {



  return (
    // if the user is logged in, the index page is Dashboard. Otherwise it is the sign in page
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<UserSignInForm />} />
          <Route path="/signin" element={<UserSignInForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<NewUserForm />} />
          <Route path="/create-task" element={<ProtectedRoute><CreateTaskForm /></ProtectedRoute>} />
          <Route path="/edit-task" element={<ProtectedRoute><EditTaskForm /></ProtectedRoute>} />
          <Route path="/mytasks" element={<ProtectedRoute><MyCreatedTasks /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App;
