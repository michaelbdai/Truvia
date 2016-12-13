var express = require('express');
var morgan = require('morgan');
var path = require('path');
var port = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser');
// var Promise = require('bluebird');
var session = require('express-session');
var db = require('./server/db');
var Rooms = require('./server/rooms');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('Get request successful!');
});

app.post('/signin', function(req, res) {
  db.verifyUser(req.body.name, req.body.password).then(function(results) {
    res.json(results);
  });
});

app.post('/signup', function(req, res) {
  db.registerUser(req.body.name, req.body.password).then(function(results) {
    res.json(results);
  });
});

//post an answer to question
app.post('/rooms/:answer', function(req, res) {

});

//add user to a room
app.post('/rooms/:room', function(req, res) {

});

//get all the rooms
app.get('/rooms', function(req, res) {
  res.json(Rooms.getRooms());
});

// returns a single room object
app.post('/rooms', function(req, res) {
  console.log(req.body);
  Rooms.makeRoom(req.body.roomname, req.body.user);
  console.log(Rooms.getRooms())
  res.json(Rooms.getRoom(req.body.roomname).getPlayers());
});


app.listen(port);
console.log("Server listening on port " + port);

module.exports = app;