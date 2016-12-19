const triviaRoute = require('express').Router();
const auth = require('./controllers/rest/auth');
const sessions = require('./controllers/rest/Sessions');
const io = require('./index.js').io;
const triviaCtrl = require('./controllers/socket/Trivia');

triviaRoute.route('/guest')
  .post(sessions.guestLogin)

triviaRoute.route('/sessions')
  .get(sessions.getSessions)

// // SOCKET ROUTES
triviaCtrl(io.of('/trivia'));

module.exports = triviaRoute;
