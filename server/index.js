const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const session = require('express-session');
const cors = require('cors');
require('isomorphic-fetch');

const triviaRoute = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;
global.jwtSecret = process.env.JWT_SECRET || 'HoorayTeamSpinach';

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: true }
// }));

app.use(cors());

app.use('/', triviaRoute);

app.listen(port);
console.log("Server listening on port " + port);

/////////////////////////////////////////////////////////////////////////
// Sockets
io.on('connection', (socket) => {
  socket.broadcast.emit('A user has connected');
});

module.exports = app;
