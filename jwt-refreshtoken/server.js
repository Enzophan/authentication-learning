require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('./_helpers/jwt');
const verifyJWT = require('./_helpers/verifyJWT');
const errorHandler = require('./_helpers/error-handler');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());
// app.use(verifyJWT);

// api routes
// app.use('/api/users', require('./Users/user.route'));
require('./Routes')(app);


// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 8000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});