const express = require("express");
const fs = require("fs");
var path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const authentication = require('./_helpers/authentication');
const errorHandler = require('./_helpers/error-handler');
const port = process.env.PORT || 3535;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// use basic HTTP auth to secure the api
app.use(authentication);

// api routes
// app.use('/users', require('./Users/user.controller'));

// Router
require('./Routes')(app);

// global error handler
app.use(errorHandler);


app.listen((port), () => {
    console.log(`Server running on port ${port}`)
})