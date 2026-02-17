import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css"
const Header = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }
  return (
    <>
      <Navbar bg={token ? "primary" : "dark"} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="">
            {token ? "Abdullah" : "Abdullah Notes"}
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className='nav-link'>
                  dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className='nav-link'>
                  profile
                </Nav.Link>
                <Nav.Link className="nav-link" onClick={handleLogout} >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className='nav-link'>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className='nav-link'>Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Abdullah Notes</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login" className='nav-link'>Login</Nav.Link>
            <Nav.Link as={Link} to="/Register" className='nav-link'>Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
    </>
  )
}

export default Header;