import logo from './logo.svg';
import './App.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/auth/login/Login';
import Signup from './pages/auth/signup/Signup';
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  return (
    <>
      <Header> </Header>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/Register" element={<Signup />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </>
  );
}

export default App;
