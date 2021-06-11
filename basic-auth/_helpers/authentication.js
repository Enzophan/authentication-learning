const userService = require('../Users/user.service');

module.exports = authentication;

async function authentication(req, res, next) {
    var authheader = req.headers.authorization;
    console.log(req.headers);

    // make authenticate path public
    if (req.path === '/api/users/authenticate') {
        return next();
    }

    if (!authheader) {
        var err = new Error("You are not authenticated!");
        res.setHeader('WWW-Authentication', 'Basic');
        err.status = 401;
        return next(res)
    }

    var auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    // if (username === 'admin' && password === 'password') {
    //     next();
    // } else {
    //     var err = new Error('Your are not authenticated');
    //     res.setHeader('WWW-Authentication', 'Basic')
    //     err.status = 401;
    //     return next(res)
    // }

    const user = await userService.authenticate({ username, password });
    if (!user) {
        var err = new Error('Your are not authenticated');
        res.setHeader('WWW-Authentication', 'Basic')
        err.status = 401;
        return next(res)
    }

    // attach user to request object
    console.log("user ", user)
    req.user = user
    next();
}
