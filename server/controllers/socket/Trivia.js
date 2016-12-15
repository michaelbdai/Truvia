const io = require('../../index.js').io;
const socketioJwt = require('socketio-jwt');
const manager = require('../../models/GameSessionsManager');
const _ = require('lodash');

let triviaSocket = io.of('/trivia');

triviaSocket
  .on('connection', socketioJwt.authorize({
    secret: jwtSecret,
    timeout: 15000
  }))
  .on('authenticated', (socket) => {
    const token = socket.decoded_token;
    console.log('User authenticated socket /trivia with token: ' +
      JSON.stringify(token, null, 2));

    socket.session = socket.session || manager.getSession(token.roomID);
    if (!socket.session && token.owner) {
      const owner = { name: token.name, socket };
      socket.session = manager.createTriviaSession(owner, token.roomID);
    } else {
      socket.emit('error', 'Game can only be created by owner');
      socket.disconnect();
    }
    socket.user = token.name;

    if (!socket.session.getPlayer(token.name)) {
      socket.session.addPlayer({ name: token.name, socket });
    }

    triviaSocket.emit('user enter', token.name, socket.session.getPlayersCount());

    const session = socket.session;
    const room = token.roomID;
    socket.on('game start', () => {
      if (token.owner) {
        const players = socket.session.getPlayers();
        console.log(`Trivia game starting with players ${_.map(players, p => p.name)}`);
        _.each(players, p => {
          p.socket.join(token.roomID);
          console.log(`Player ${p.name} joined in room ${room}`);
        });
        socket.gameState = 'QUESTION';
        session.getCurrentQuestion().then(question => {
          triviaSocket.to(room).emit('question', question);
        });
      } else {
        socket.emit('error', 'Game can only be started by owner');
      }
    });

    socket.on('answer', (answer, cb) => {
      if (session.answerQuestion(answer, socket.user)) {
        cb(true);
        triviaSocket.to(room).emit('answered', socket.user);
        if (session.getPlayer(socket.user).score > 8) {
          triviaSocket.to(room).emit('end', socket.user);
        } else {
          setTimeout(() => session.getCurrentQuestion().then(question => {
            triviaSocket.to(room).emit('question', socket.user);
          }), 3000);
        }
      } else {
        cb(false);
      }
    });

    socket.on('all scores', cb => {
      cb(session.getScoreBoard());
    });

  });

console.log('Started trivia socket');
