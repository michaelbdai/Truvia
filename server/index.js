const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('isomorphic-fetch');

const app = express();

const triviaRoute = require('./routes');
const port = process.env.PORT || 8080;
global.jwtSecret = process.env.JWT_SECRET || 'HoorayTeamSpinach';

app.use(express.static('client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

app.use('/', triviaRoute);

const server = app.listen(port);
const io = require('socket.io')(server);

console.log("Server listening on port " + port);

module.exports = {app, io};

// Run the socket connections
require('./controllers/socket/Trivia');
