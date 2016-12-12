var express = require('express');
var morgan = require('morgan');
var path = require('path');
var port = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var db = require('./server/db'); // from Will

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res) {
  res.send('Get request successful!');
});


// getRooms = array of roonnames
// getRoomUsers = array of udernames

// may need to change paths depending on front end routes

app.get('/users', function(req, res) {
  db.getRoomUsers().then(function(results) {
    res.json(results);
  });
});

app.post('/users', function(req, res) {
  var params = [req.body.name, req.body.password];
  db.createUser(params).then(function(results) {
    res.json(results);
  });
});

app.get('/rooms', function(req, res) {
  db.getRooms().then(function(results) {
    res.json(results);
  });
});

app.post('/rooms', function(req, res) {
  db.roomFindOrCreate(req.body.name).then(function(results) {
    res.json(results);
  });
});

app.listen(port);
console.log("Server listening on port " + port);

module.exports = app;