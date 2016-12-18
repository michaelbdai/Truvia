const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const vcapServices = require('vcap_services');
const extend = require('util')._extend
const watson = require('watson-developer-cloud');
const path = require('path');
const compression = require('compression');
const Promise = require('bluebird');
Promise.longStackTraces();
global.Promise = Promise;

process.env.PWD = process.cwd();

require('isomorphic-fetch');
require('dotenv').load({silent: true});

const app = express();

const port = process.env.PORT || 8080;
global.jwtSecret = process.env.JWT_SECRET || 'HoorayTeamSpinach';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
// to be moved later to config file.
var username = '3874ec47-c72a-41c5-bc52-72e74b0070cd';
var password = 'nyks7d6REJGx';
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: process.env.STT_USERNAME || username,
  password: process.env.STT_PASSWORD || password
}, vcapServices.getCredentials('speech_to_text'));

var authService = watson.authorization(config);

// Enable gzip compression static files
app.use(compression());

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
const p1 = path.join(__dirname, '../client')
const p2 = path.join(__dirname, '/../client')
const p3 = path.normalize(path.join(__dirname, '../client'))
const p4 = path.join(process.cwd(), '../client')

console.log(`${p1}\n${p2}\n${p3}\n${p4}\n`);
app.use('/api', triviaRoute);

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', function (request, response){
  const index = path.resolve(__dirname, '../client/public', 'index.html');
  console.log('Sending index ' + index);
  response.sendFile(index);
})
