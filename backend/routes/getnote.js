const express = require('express');
const cors = require('cors');
const { getNote } = require('../controller/getnote');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
router.use(cors());

router.get('/get-note', authenticateToken, getNote);
module.exports = router;