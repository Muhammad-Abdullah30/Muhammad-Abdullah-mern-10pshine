const Note = require('../models/note');
async function createNote(title, content, tags, user) {
    if (!title) {
        throw new Error("Title is required");
    }
    if (!content) {
        throw new Error("Content is required");
    }
    try {
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user.id, // user.id comes from JWT payload
        });
        const savedNote = await note.save();
        return savedNote;
    } catch (error) {
        console.error('Note creation error:', error.message);
        throw error;
    }
}
// async function getNotes(userId) {
//     try {
//         const notes = await Note.find({ userId: userId }).sort({ isPinned: -1, createdOn: -1 });
//         return notes;
//     } catch (error) {
//         console.error('Error fetching notes:', error.message);
//         throw error;
//     }
// }

async function updatePinStatus(noteId, userId) {
    try {
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if (!note) {
            throw new Error('Note not found');
        }
        note.isPinned = !note.isPinned;
        await note.save();
        return note;
    } catch (error) {
        console.error('Error updating pin status:', error.message);
        throw error;
    }
}

async function updateNote(noteId, userId, title, content, tags) {
    try {
        const note = await Note.findOne({ _id: noteId, userId: userId });
        if (!note) {
            throw new Error('Note not found');
        }
        if (title) note.title = title;
        if (content) note.content = content;
        if (tags !== undefined) note.tags = tags;
        await note.save();
        return note;
    } catch (error) {
        console.error('Error updating note:', error.message);
        throw error;
    }
}

async function deleteNote(noteId, userId) {
    try {
        const result = await Note.findOneAndDelete({ _id: noteId, userId: userId });
        if (!result) {
            throw new Error('Note not found');
        }
        return result;
    } catch (error) {
        console.error('Error deleting note:', error.message);
        throw error;
    }
}

module.exports = { createNote,  updatePinStatus, updateNote, deleteNote }