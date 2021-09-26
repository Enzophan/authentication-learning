const config = require('../config.json');
const jwt = require('jsonwebtoken');
const verifyJWT = require('../_helpers/verifyJWT')
const tokenList = {};

// users hardcoded for simplicity, store in a db for production applications
const users = [
    { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' },
    { id: 2, username: 'admin', password: 'password', firstName: 'Admin', lastName: 'User' }
];


async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 15 mins
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: config.tokenLife });
    // Tạo một mã token khác - Refresh token
    const refreshToken = jwt.sign({ sub: user.id }, config.refreshTokenSecret, {
        expiresIn: config.refreshTokenLife
    });
    // Lưu lại mã Refresh token, kèm thông tin của user để sau này sử dụng lại
    tokenList[refreshToken] = user;

    return {
        ...omitPassword(user),
        token,
        refreshToken
    };
}

async function refreshToken({ refreshToken, username }) {
    if (refreshToken && (refreshToken in tokenList) && (tokenList[refreshToken].username == username)) {
        try {
            // Kiểm tra mã Refresh token
            await verifyJWT.verifyJwtToken(refreshToken, config.refreshTokenSecret);

            // Lấy lại thông tin user
            const user = tokenList[refreshToken];

            // Tạo mới mã token và trả lại cho user
            const token = jwt.sign({ sub: user.id }, config.secret, {
                expiresIn: config.tokenLife,
            });

            return {
                token
            }
        } catch (error) {
            return {
                error,
                token: null
            }
        }
    } else {
        return {
            token: null
        }
    }
};


async function rejectToken({ refreshToken }) {
    if (refreshToken in tokenList) {
        delete tokenList[refreshToken]
    }
    return {
        msg: "Removed refresh Token"
    }
};


async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}


module.exports = {
    authenticate,
    refreshToken,
    rejectToken,
    getAll
};