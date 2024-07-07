const User = require('./models/User');
const Role = require('./models/Role');
const {logger} = require('./utils/logger.js')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const {generateAccessToken, generateRefreshToken,
    checkAccessToken, checkRefreshToken} = require('./utils/tokenFunctions');

let refreshTokens = []

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка при регистрации', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value: 'USER'});

            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: 'Пользователь успешно зарегистрирован'});
        } catch (e) {
            logger.error(e)
            res.status(400).json({message: 'Registration error'})
        }

    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: 'Пользователь с таким именем не найден'})
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword) {
                return res.status(400).json({message: 'Введен не верный пароль'})
            }
            const accessToken = generateAccessToken(user._id, user.roles);
            const refreshToken = generateRefreshToken(user._id, user.roles);
            refreshTokens.push(refreshToken);
            return res.json({accessToken: accessToken, refreshToken: refreshToken});
        } catch (e) {
            logger.error(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getToken(req, res) {
        try {
            const refreshToken = req.body.refreshToken
            if (refreshToken == null) return res.status(401).json({message: 'Вы не авторизованы!'})
            if (!refreshTokens.includes(refreshToken)) return res.status(403).json({message: 'Вы не авторизованы!'})
            const payload = checkRefreshToken(refreshToken)
            res.status(200).json({accessToken: generateAccessToken(payload)})

        } catch (e) {
            logger.error(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async logout(req, res) {
        try {
            refreshTokens = refreshTokens.filter(token => token !== req.body.refreshToken);
            res.status(200).json({message: 'Sucessfully logout'});
        } catch (e) {
            logger.error(e)
            res.status(400).json({message: e})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            res.json({message: e})
        }

    }
}

module.exports = new authController()