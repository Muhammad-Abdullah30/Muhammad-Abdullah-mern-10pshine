const crypto = require('crypto');
// generate a secure random secret key for JWT signing
const secretKey = crypto.randomBytes(32).toString('hex');
module.exports = {
    jwtSecret: secretKey,
    jwtExpiration: '1h', // token expiration time
};