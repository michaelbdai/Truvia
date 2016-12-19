const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const extend = require('util')._extend
const watson = require('watson-developer-cloud');
const path = require('path');
const compression = require('compression');
const Promise = require('bluebird');
Promise.longStackTraces();
global.Promise = Promise;

require('isomorphic-fetch');
require('dotenv').load({silent: true});

const app = express();

const port = process.env.PORT || 8080;
global.jwtSecret = process.env.JWT_SECRET || 'HoorayTeamSpinach';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

// Enable gzip compression static files
app.use(compression());


const server = app.listen(port);
const io = require('socket.io')(server);

console.log("Server listening on port " + port);

module.exports = {app, io};

const triviaRoute = require('./routes');
app.use('/api', triviaRoute);

app.use(express.static(path.join(__dirname, '../client/public')));

app.get('*', function (request, response){
  const index = path.resolve(__dirname, '../client/public', 'index.html');
  console.log('Sending index ' + index);
  response.sendFile(index);
})
