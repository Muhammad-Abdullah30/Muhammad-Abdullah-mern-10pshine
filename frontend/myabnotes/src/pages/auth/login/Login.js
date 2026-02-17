import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./login.css";
import { Button, Form } from 'react-bootstrap';
const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("email: ",formData.email);
    // console.log("name: ",formData.name);
    // console.log("password: ",formData.password);
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(formData)
      })
      const result = await response.json();
      if (!response.ok) {
        alert(result.error || 'Login failed');
        return;
      }
      console.log(result);
      localStorage.setItem('token', result.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while logging in.');
    } finally {
      setFormData({
        email: '',
        password: ''
      })
    }
  }

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100">
          LogIn
        </Button>
      </Form>
    </div>

  )
}

export default Login;