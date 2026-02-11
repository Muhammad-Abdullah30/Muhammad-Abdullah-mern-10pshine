import './App.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import AddNotes from './pages/dashboard/addnotes';
import EditNote from './pages/dashboard/editnote';
import UserProfile from './pages/profile/UserProfile';

function App() {
  return (
    <>
      <Header> </Header>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Register" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/dashboard/addnotes" element={<AddNotes />}></Route>
        <Route path="/dashboard/editnote/:noteId" element={<EditNote />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
      </Routes>
    </>
  );
}

export default App;
