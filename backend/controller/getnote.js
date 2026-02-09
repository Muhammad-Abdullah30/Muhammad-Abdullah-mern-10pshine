const noteService = require('../services/getnote');

async function getNote(req, res) {
    try {
        // req.user is populated by authenticateToken middleware
        const userId = req.user.id || req.user._id;

        if (!userId) {
            return res.status(401).json({ message: "User not authenticated or ID missing" });
        }

        const notes = await noteService.getNotes(userId);
        res.status(200).json({ notes: notes, message: "notes retrieved Successfully" });
    }
    catch (error) {
        console.error("Error in getNote controller:", error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getNote };