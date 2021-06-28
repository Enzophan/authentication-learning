
const config = require('../config.json');

module.exports = verifyToken;

async function verifyToken(req, res, next) {
    if (req.headers["x-access-token"]) {
        const accessToken = req.headers["x-access-token"];

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
}