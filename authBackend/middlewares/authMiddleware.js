const {logger} = require('../utils/logger');
const jwt = require('jsonwebtoken');
const {checkAccessToken} = require('../utils/tokenFunctions');

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS"){
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        req.user = checkAccessToken(token);
        next()
    } catch (e) {
        logger.error(e);
        return res.status(403).json({message: 'Пользователь не авторизован'});
    }
}