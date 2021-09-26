const userService = require('./users.service');


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function refreshToken(req, res, next) {
    userService.refreshToken(req.body)
        .then(data => res.json(data))
        .catch(next);
}

function rejectToken(req, res, next) {
    userService.rejectToken(req.body)
        .then(data => res.json(data))
        .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

module.exports = {
    authenticate,
    refreshToken,
    rejectToken,
    getAll
}