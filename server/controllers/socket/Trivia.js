const manager = require('../../models/GameSessionsManager');
const TriviaSession = require('../../models/TriviaSession');
const _ = require('lodash');

let scrubQuestion = (question) => {
  let q = _.cloneDeep(question);
  q.incorrect_answers.push(q.correct_answer);
  const options = q.incorrect_answers.slice();
  delete q.incorrect_answers;
  delete q.correct_answer;
  q['options'] = options;
  return q;
}

module.exports = triviaSocket => {
  manager.socketRestoreSession(triviaSocket, TriviaSession, socket => {
    const token = socket.decoded_token;
    triviaSocket.emit('user enter', {
      name: token.name,
      count: socket.session.getPlayersCount(),
      scoreObj: socket.session.getScoreBoard(),
    });

    const session = socket.session;
    const room = token.roomID;

    const sendQuestion = () => {
      if (session.stopped()) return;

      session.nextQuestion();
      session.getCurrentQuestion().then(question => {
        console.log('CORRECT ANSWER IS ' + question.correct_answer);
        triviaSocket.to(room).emit(
          'question',
          scrubQuestion(question),
          session.getQuestionNumber()
        )
      });

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
        session.start();
        console.log(`Trivia game starting with players ${_.map(players, p => p.name)}`);
        _.each(players, p => {
          p.socket.join(token.roomID);
          console.log(`Player ${p.name} joined in room ${room}`);
        });
        triviaSocket.to(room).emit('game started');
        sendTimedQuestion(30);
      } else {
        socket.emit('error', 'Game can only be started by owner');
      }
    });

    socket.on('answer', (answer, cb) => {
      if (session.stopped()) return;
      if (session.answerQuestion(answer, socket.user)) {
        cb(true);
        let user
        triviaSocket.to(room).emit('answered', session.getScoreBoard(), socket.user);
        if (session.gameShouldEnd()) {
          session.stop();
          triviaSocket.to(room).emit('game end', session.getScoreBoard());
        } else {
          // Every 25 seconds send a new quesiton
          sendTimedQuestion(30);
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
