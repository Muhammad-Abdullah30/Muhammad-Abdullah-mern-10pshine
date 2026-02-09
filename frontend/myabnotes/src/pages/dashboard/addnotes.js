import React, { use, useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddNotes = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    content: '', title: '',
    tags: ''
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
      const response = await fetch('http://localhost:5000/note/add-note', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }, body: JSON.stringify(formData)
      })
      const result = await response.json();
      if (!response.ok) {
        alert(result.error || 'Failed to add note');
        return;
      }
      console.log(result);
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      alert('An error occurred while Adding Notes.');
    } finally {
      setFormData({
        content: '',
        title: '',
        tags: ''
      })
    }
  }
  return (

    <div className='note-form-container'>
      <Form onSubmit={handleSubmit}>
        <h1>Add Note</h1>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="content"
            placeholder="Type your note here..."
            value={formData.content}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formTags">
          <Form.Label>Tags (comma separated)</Form.Label>
          <Form.Control
            type="text"
            name="tags"
            placeholder="Enter tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="dark" type="submit" className="w-100 mt-3">
          Add Note
        </Button>
        <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate('/dashboard')}>
          Cancel
        </Button>
      </Form>
    </div>
  );





  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     // console.log("email: ",formData.email);
  //     // console.log("name: ",formData.name);
  //     // console.log("password: ",formData.password);
  //     try {
  //       const response= await fetch('http://localhost:5000/user/add-note',{
  //         method:'POST',
  //         headers:{
  //           "Content-Type":"application/json"
  //         },body:JSON.stringify(formData) 
  //       })
  //       const result= await response.json();
  //       console.log(result);
  //         navigate('/dashboard');
  //     } catch (error) {
  //       console.error(error.message);
  //     }finally
  //     {
  //         setFormData({
  //             content:'',
  //             title:'',
  //             tags:''
  //         })
  //     }
  //   }

  //   return (

  //   )
}

export default AddNotes;