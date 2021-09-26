const express = require('express');
const Common = require('../Common/common.route');
const Users = require('../Users/user.route')

module.exports = function (app) {
    app.use('/', Common);
    app.use('/api/users', Users);
}