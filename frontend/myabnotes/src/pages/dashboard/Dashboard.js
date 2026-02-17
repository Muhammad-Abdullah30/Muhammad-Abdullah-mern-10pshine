import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NoteCard from "./notecard";
import "./dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
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
        alert(result.message || 'Failed to fetch notes');
        return;
      }
      console.log(result);
      setNotes(result.notes || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
      alert('Error fetching notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handlePinNote = async (noteId) => {
    try {
      const response = await fetch(`http://localhost:5000/note/pin-note/${noteId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || 'Failed to pin note');
        return;
      }
      // Update the notes list - re-fetch to get correct sorting
      fetchNotes();
    } catch (error) {
      console.error('Error pinning note:', error);
      alert('Error pinning note');
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/note/delete-note/${noteId}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (!response.ok) {
        alert(result.message || 'Failed to delete note');
        return;
      }
      // Update the notes list
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note');
    }
  };

  if (loading) {
    return <div>Loading notes...</div>;
  }

  return (
    <>
      <div className="add-note-container">
        <Button onClick={() => navigate("./addnotes")} className="add-note-btn">Add Note</Button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <NoteCard
            key={note._id || note.id}
            title={note.title}
            content={note.content}
            date={note.createdOn ? new Date(note.createdOn).toLocaleDateString() : note.date}
            tags={note.tags}
            isPinned={note.isPinned}
            onPin={() => handlePinNote(note._id)}
            onEdit={() => navigate(`./editnote/${note._id}`)}
            onDelete={() => handleDeleteNote(note._id)}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
