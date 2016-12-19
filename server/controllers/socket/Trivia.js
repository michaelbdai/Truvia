const _ = require('lodash');

const TriviaSession = require('../../models/TriviaSession');
const manager = require('../../models/GameSessionsManager');

/**
 * scrubQuestion - Utility for trivia socket controller that creates a cloned object
 * with the 'correct_answer' and 'incorrect_answers' merged into an 'options' key
 *
 * @param {Object} question JSON for question from the trivia API
 * @returns {Object} JSON with answers merged into 'options' key
 */
let scrubQuestion = (question) => {
  let q = _.cloneDeep(question);
  q.incorrect_answers.push(q.correct_answer);
  const options = q.incorrect_answers.slice();
  delete q.incorrect_answers;
  delete q.correct_answer;
  q['options'] = options;
  return q;
}


/**
 * Trivia - Socket controller for TriviaSession model
 */
module.exports = triviaSocket => {
  manager.socketRestoreSession(triviaSocket, TriviaSession, socket => {
    const token = socket.decoded_token;

    // Inform all trivia clients that a user entered the game
    triviaSocket.emit('user enter', {
      name: token.name,
      count: socket.session.getPlayersCount(),
      scoreObj: socket.session.getScoreBoard(),
    });

    const session = socket.session;
    const room = token.roomID;

    // Utility function to fetch trivia current quesiton and send it to the
    // correct room socket
    const sendQuestion = () => {
      if (session.stopped()) return;

      session.getCurrentQuestion().then(question => {
        console.log('CORRECT ANSWER IS ' + question.correct_answer);
        triviaSocket.to(room).emit(
          'question',
          scrubQuestion(question),
          session.getQuestionNumber(),
          session.getRounds()
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
            session.nextQuestion();
            sendTimedQuestion(timeoutSecs);
          }
        }, (timeoutSecs - 3) * 1000);
      }, 3000);
    }

    // GAME LOGIC

    // When a 'game start' message is recieved from an owning client, start the
    // session model game
    socket.on('game start', (rounds = 8) => {
      if (token.owner) {
        const players = socket.session.getPlayers();
        session.setRounds(rounds);
        session.start();
        console.log(`Trivia game starting with players ${_.map(players, p => p.name)}`);

        // Move all players sockets to the correct room
        _.each(players, p => {
          p.socket.join(token.roomID);
          console.log(`Player ${p.name} joined in room ${room}`);
        });

        // Inform client game started and send a question of 30 sec duration
        triviaSocket.to(room).emit('game started');
        sendTimedQuestion(30);
      } else {
        socket.emit('error', 'Game can only be started by owner');
      }
    });

    // When a client answers correctly, inform all clients of who correctly answered
    // and send the next question
    socket.on('answer', (answer, cb) => {
      if (session.stopped()) return;

      if (session.answerQuestion(answer, socket.user)) {
        // Correct answer from client
        cb(true);
        let user;

        // Tell all users who answered correctly
        triviaSocket.to(room).emit('answered', session.getScoreBoard(), socket.user);

        if (session.gameShouldEnd()) {
          // Check if game needs to end
          session.stop();
          triviaSocket.to(room).emit('game end', session.getScoreBoard());
        } else {
          // If game shouldn't end send another question
          sendTimedQuestion(30);
        }
      } else {
        //Incorrect answer from client
        cb(false);
      }
    });

    // Send scoreboard to client when they ask
    socket.on('scoreboard', cb => {
      cb(session.getScoreBoard());
    });
  });
};



console.log('Started trivia socket');
