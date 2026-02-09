import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        content: '',
        title: '',
        tags: ''
    });

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await fetch('http://localhost:5000/dashboard/get-note', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const result = await response.json();
                if (!response.ok) {
                    alert(result.message || 'Failed to fetch note');
                    return;
                }
                const note = result.notes.find(n => n._id === noteId);
                if (note) {
                    setFormData({
                        title: note.title || '',
                        content: note.content || '',
                        tags: note.tags ? note.tags.join(', ') : ''
                    });
                }
            } catch (error) {
                console.error('Error fetching note:', error);
                alert('Error fetching note');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [noteId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [];
            const response = await fetch(`http://localhost:5000/note/edit-note/${noteId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                    tags: tagsArray
                })
            });
            const result = await response.json();
            if (!response.ok) {
                alert(result.message || 'Failed to update note');
                return;
            }
            console.log(result);
            navigate('/dashboard');
        } catch (error) {
            console.error(error.message);
            alert('An error occurred while updating note.');
        }
    };

    if (loading) {
        return <div>Loading note...</div>;
    }

    return (
        <div className='note-form-container'>
            <Form onSubmit={handleSubmit}>
                <h1>Edit Note</h1>
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
                        placeholder="Type Here"
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
                    Update Note
                </Button>
                <Button variant="secondary" className="w-100 mt-2" onClick={() => navigate('/dashboard')}>
                    Cancel
                </Button>
            </Form>
        </div>
    );
};

export default EditNote;
