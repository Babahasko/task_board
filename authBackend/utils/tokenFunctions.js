require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '5m'});
}

function checkAccessToken(token) {
    return jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
}

function generateRefreshToken(id, roles) {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '1d'});
}

function checkRefreshToken(token) {
    return jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    checkRefreshToken,
    checkAccessToken,
}