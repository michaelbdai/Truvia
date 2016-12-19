const express = require('express');
const path = require('path');
const Promise = require('bluebird');
Promise.longStackTraces();
global.Promise = Promise;
require('isomorphic-fetch');

const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

global.jwtSecret = process.env.JWT_SECRET || 'HoorayTeamSpinach';


const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '../client/public')));

// Server and IO initialization
const port = process.env.PORT || 8080;
const server = app.listen(port);
const io = require('socket.io')(server);
console.log('Server listening on port ' + port);

// route require has to be required after exports because of circular dependency
module.exports = {app, io};
const triviaRoute = require('./routes');

// Routes
app.use('/api', triviaRoute);
// All requests for non found static files go to client side router
app.get('*', function (request, response){
  const index = path.resolve(__dirname, '../client/public', 'index.html');
  console.log('Sending index ' + index);
  response.sendFile(index);
});
