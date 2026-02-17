const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../configuration/jwtConfig');

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
}


module.exports = { generateToken };