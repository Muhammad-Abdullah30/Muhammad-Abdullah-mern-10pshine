import React, { use }  from 'react'
import { Button, Form } from 'react-bootstrap';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Signup = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({
    email:'',
    name:'',
    password:''
  })

  const handleInputChange=(event)=>{
    const {name, value} = event.target;
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
      const response= await fetch('http://localhost:5000/user/Register',{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },body:JSON.stringify(formData) 
      })
      const result= await response.json();
      console.log(result);
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }finally
    {
      setFormData({
        email:'',
        name:'',
        password:''
      })
    }
  }

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Signup</h1>
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter name"
            value={formData.name}
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
          Signup
        </Button>
      </Form>
    </div>
  )
}

export default Signup;