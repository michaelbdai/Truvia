const manager = require('../../models/GameSessionsManager');
const TriviaSession = require('../../models/TriviaSession');
const _ = require('lodash');

module.exports = triviaSocket => {
  manager.socketRestoreSession(triviaSocket, TriviaSession, socket => {
    const token = socket.decoded_token;
    triviaSocket.emit('user enter', token.name, socket.session.getPlayersCount());

    const session = socket.session;
    const room = token.roomID;

    const sendQuestion = () => {
      if (session.gameState === 'END') return;

      session.nextQuestion();
      session.getCurrentQuestion().then(question =>
        triviaSocket.to(room).emit(
          'question',
          question,
          session.getQuestionNumber()
        ));

      // Set timeout to give options after 10 seconds
      setTimeout(() => triviaSocket.to(room).emit('options'), 10000);
    };

    // sendTimedQuestion will send new questions when the quesiton has gone too long
    // without being answered
    const sendTimedQuestion = timeoutSecs => {
      // Get the current question number
      const backThenQNum = session.getQuestionNumber();
      setTimeout(() => {
        // send the question down socket
        sendQuestion();
        // Set a timer for the timeout to check if the question hasnnt been answered
        setTimeout(()=>{
          // If question number is still the same as back then, send another timed question
          if (backThenQNum === session.getQuestionNumber()) {
            sendTimedQuestion(timeoutSecs);
          }
        }, (timeoutSecs - 3) * 1000);
      }, 3000);
    }

    socket.on('game start', (rounds = 8) => {
      if (token.owner) {
        const players = socket.session.getPlayers();
        session.setRounds(rounds);
        console.log(`Trivia game starting with players ${_.map(players, p => p.name)}`);
        _.each(players, p => {
          p.socket.join(token.roomID);
          console.log(`Player ${p.name} joined in room ${room}`);
        });
        session.gameState = 'QUESTION';
        sendTimedQuestion(8);
      } else {
        socket.emit('error', 'Game can only be started by owner');
      }
    });

    socket.on('answer', (answer, cb) => {
      if (session.gameState !== 'QUESTION') return;
      if (session.answerQuestion(answer, socket.user)) {
        cb(true);
        triviaSocket.to(room).emit('answered', socket.user);
        if (session.gameShouldEnd()) {
          session.gameState = 'END';
          triviaSocket.to(room).emit('game end', socket.user);
        } else {
          // Every 25 seconds send a new quesiton
          sendTimedQuestion(8);
        }
      } else {
        cb(false);
      }
    });

    socket.on('scoreboard', cb => {
      cb(session.getScoreBoard());
    });
  });
};



console.log('Started trivia socket');
