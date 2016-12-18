const triviaRoute = require('express').Router();
const auth = require('./controllers/rest/auth');
const rooms = require('./controllers/rest/rooms');
const io = require('./index.js').io;
const triviaCtrl = require('./controllers/socket/Trivia');

// API ROUTES
// triviaRoute.route('/signin')
//   .post(auth.signin)
//
// triviaRoute.route('/signup')
//   .post(auth.signup)

triviaRoute.route('/guest')
  .post(rooms.guestLogin)

triviaRoute.route('/sessions')
  .get(rooms.getSessions)

// triviaRoute.route('/rooms')
//   .get(rooms.getAll)
//   .post(rooms.createOne)

// // SOCKET ROUTES
triviaCtrl(io.of('/trivia'));

// triviateRoute.route('/rooms/adduser/:user') // Not yet implemented
// triviateRoute.route('/rooms/:answer') // Not yet implemented

module.exports = triviaRoute;
