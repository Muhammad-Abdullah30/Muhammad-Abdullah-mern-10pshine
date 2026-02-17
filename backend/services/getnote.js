const Note = require('../models/note');

async function getNotes(userId) {
    try {
        const notes = await Note.find({ userId: userId }).sort({ isPinned: -1, createdOn: -1 });
        return notes;
    } catch (error) {
        console.error('Error fetching notes from service:', error.message);
        throw error;
    }
}

module.exports = { getNotes };
