const io = require('../../index.js').io;
const socketioJwt = require('socketio-jwt');
const Rooms = require('../../models/rooms');

const gameClients = {};

let triviaSocket = io.of('/trivia');

triviaSocket
  .on('connection', socketioJwt.authorize({
    secret: jwtSecret,
    timeout: 15000
  }))
  .on('authenticated', socket => {
    const token = socket.decoded_token;
    console.log('User authenticated socket /trivia with token: ' +
      JSON.stringify(token, null, 2));
    const lobID = token.roomID + 'lobby';
    const gameID = token.roomID;
    socket.join(lobID);

    gameClients[gameID] = gameClients[gameID] || [];
    gameClients[gameID].push(socket);

    triviaSocket.to(lobID).emit('user enter', token.user, gameClients[gameID].length);

    socket.on('game start', () => {
      if (token.owner) {
        const players = gameClients[gameID].map(s => s.decoded_token.user);
        console.log(`Trivia game starting with players ${players}`);
        gameClients[gameID].forEach(socket => {
          socket.leave(lobID);
          socket.join(gameID);
        });
      } else {
        socket.emit('error', 'Game can only be started by owner');
      }
    });

  });

console.log('Started trivia socket');
