
const noteService = require('../services/note');

async function createNote(req, res) {
    try {
        const { title, content, tags } = req.body;
        const user = req.user; // req.user is populated by authenticateToken middleware
        const note = await noteService.createNote(title, content, tags, user);
        res.status(201).json({ note: note, message: "note created Successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function pinNote(req, res) {
    try {
        const noteId = req.params.noteId;
        const userId = req.user.id || req.user._id;
        const note = await noteService.updatePinStatus(noteId, userId);
        res.status(200).json({ note: note, message: note.isPinned ? "Note pinned" : "Note unpinned" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function editNote(req, res) {
    try {
        const noteId = req.params.noteId;
        const userId = req.user.id || req.user._id;
        const { title, content, tags } = req.body;
        const note = await noteService.updateNote(noteId, userId, title, content, tags);
        res.status(200).json({ note: note, message: "Note updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

async function deleteNote(req, res) {
    try {
        const noteId = req.params.noteId;
        const userId = req.user.id || req.user._id;
        await noteService.deleteNote(noteId, userId);
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
}

module.exports = { createNote, pinNote, editNote, deleteNote };