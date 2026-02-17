const express = require('express');
const cors = require('cors');
const { createNote, pinNote, editNote, deleteNote } = require('../controller/note');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
router.use(cors());

router.post('/add-note', authenticateToken, createNote);
router.put('/pin-note/:noteId', authenticateToken, pinNote);
router.put('/edit-note/:noteId', authenticateToken, editNote);
router.delete('/delete-note/:noteId', authenticateToken, deleteNote);
module.exports = router;