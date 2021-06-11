const Users = require('../Users/user.controller');

module.exports = function (app) {
    app.use('/api/users', Users);
}