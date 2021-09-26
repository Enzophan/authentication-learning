
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const config = require('../config.json');



async function verifyToken(req, res, next) {
    const accessToken = req.body.token || req.query.token || req.headers['x-access-token'];
    if (accessToken) {
        await jwt.verify(accessToken, config.secret, function (err, data) {
            if (err) {
                return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
            } else {
                console.log("jwt.verify: " + JSON.stringify(data));
                dataVerified = data
                return data;
            };
        })
        console.log("dataVerified: " + Date() + " : " + JSON.stringify(dataVerified));
        // Check if token has expired
        if (dataVerified.exp < Date.now().valueOf() / 1000) {
            return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
        }
        res.locals.loggedInUser = await User.findById(dataVerified.userId);
        next();
    } else {
        return res.status(401).json({ error: "JWT token is require, please set header 'x-access-token'" });
    }
    next();
};

async function verifyJwtToken(token, secretKey) {
    return new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, secretKey, (err, decode) => {
            if (err) {
                return reject(err)
            };
            resolve(decode)
        })
    })
}

module.exports = {
    verifyToken,
    verifyJwtToken
};