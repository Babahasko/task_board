const {logger} = require('../utils/logger');
const jwt = require('jsonwebtoken');
const {checkAccessToken} = require('../utils/tokenFunctions');

module.exports = function(req, res, next) {
    if (req.method === "OPTIONS"){
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        logger.info(token);
        if (!token) {
            return res.status(403).json({message: 'Пользователь не авторизован'})
        }
        logger.info('Token passed in')
        req.user = checkAccessToken(token);
        logger.info(checkAccessToken(token));
        next()
    } catch (e) {
        logger.error(e);
        return res.status(403).json({message: 'Пользователь не авторизован'});
    }
}