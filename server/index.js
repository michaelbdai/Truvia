const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const vcapServices = require('vcap_services');
const extend = require('util')._extend
const watson = require('watson-developer-cloud');
require('isomorphic-fetch');
require('dotenv').load({silent: true});

const app = express();

const port = process.env.PORT || 8080;
global.jwtSecret = process.env.JWT_SECRET || 'HoorayTeamSpinach';

app.use(express.static('client/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

var username = '3874ec47-c72a-41c5-bc52-72e74b0070cd';
var password = 'nyks7d6REJGx';
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: process.env.STT_USERNAME || username,
  password: process.env.STT_PASSWORD || password
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);

// Get token using your credentials
app.get('/watsontoken', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
      next(err);
    else
      res.send(token);
  });
});

const server = app.listen(port);
const io = require('socket.io')(server);

console.log("Server listening on port " + port);

module.exports = {app, io};

// Run the socket connections
const triviaRoute = require('./routes');
app.use('/', triviaRoute);
