const User = require('../models/user');
const bcrypt = require('bcrypt');

// Get user profile with note statistics
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware (JWT payload has 'id')

        // Get user details
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get note statistics
        const Note = require('../models/note');
        const totalNotes = await Note.countDocuments({ userId });
        const pinnedNotes = await Note.countDocuments({ userId, isPinned: true });

        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            statistics: {
                totalNotes,
                pinnedNotes
            }
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Change password
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id; // From auth middleware (JWT payload has 'id')
        const { currentPassword, newPassword } = req.body;

        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }

        // Get user with password
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUserProfile,
    changePassword
};
