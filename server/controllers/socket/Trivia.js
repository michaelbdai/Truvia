const manager = require('../../models/GameSessionsManager');
const TriviaSession = require('../../models/TriviaSession');
const _ = require('lodash');

module.exports = triviaSocket => {
  manager.socketRestoreSession(triviaSocket, TriviaSession, socket => {
    const token = socket.decoded_token;
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
        session.gameState = 'QUESTION';
        session.getCurrentQuestion().then(question => {
          triviaSocket.to(room).emit('question', question);
        });
        // Every 25 seconds send a new quesiton
        setInterval(() => {
          session.nextQuestion();
          session.getCurrentQuestion()
            .then(question => triviaSocket.to(room).emit('question', question))

          // Set timeout to give options after 10 seconds
          setTimeout(() => triviaSocket.to(room).emit('options'), 10000);
        }, 25000);
      } else {
        socket.emit('error', 'Game can only be started by owner');
      }
    });

    socket.on('answer', (answer, cb) => {
      if (session.gameState !== 'QUESTION') return;
      if (session.answerQuestion(answer, socket.user)) {
        cb(true);
        triviaSocket.to(room).emit('answered', socket.user);
        if (session.getPlayer(socket.user).score > 8) {
          session.gameState = 'END';
          triviaSocket.to(room).emit('end', socket.user);
        } else {
        }
      } else {
        cb(false);
      }
    });

    socket.on('all scores', cb => {
      cb(session.getScoreBoard());
    });
  });
};



console.log('Started trivia socket');
