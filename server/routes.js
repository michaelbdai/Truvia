const triviaRoute = require('express').Router();

const io = require('./index.js').io;

const sessions = require('./controllers/rest/Sessions');
const triviaCtrl = require('./controllers/socket/Trivia');


// HTTP ROUTES
triviaRoute.route('/guest')
  .post(sessions.guestLogin)

triviaRoute.route('/sessions')
  .get(sessions.getSessions)

// SOCKET ROUTES
triviaCtrl(io.of('/trivia'));

module.exports = triviaRoute;
