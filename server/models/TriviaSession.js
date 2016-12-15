const GameSession = require('./GameSession');
const _ = require('lodash');

class TriviaSession extends GameSession {
  constructor(owner, timeout) {
    super(owner, timeout);
    this.trivia = [];
    this.currentQuestion = null;
  }

  /**
   * async addTrivia - populates trivia
   *
   * @return {type}  undefined
   */
  async addTrivia() {
    const data = await fetch('https://www.opentdb.com/api.php?amount=10');
    const triviaJSON = await data.json();
    this._setTrivia(triviaJSON.results);
  }

  // Removes keys from question marking correct answers and turns them into ambiguous options
  _scrubQueston(question) {
    question.incorrect_answers.push(question.correct_answer);
    const options = question.incorrect_answers.slice();
    delete question.incorrect_answers;
    delete question.correct_answer;
    question['options'] = options;
    return question;
  }

  async getCurrentQuestion() {
    if (!this.currentQuestion) await this.addTrivia();
    return this._scrubQueston(this.currentQuestion);
  }

  /**
   * incrementScore - increment player score
   *
   * @param  {type} player player obj
   * @return {type}        player's new score
   */
  incrementScore(playerName) {
    return ++this.getPlayer(playerName).score;
  }

  /**
   * answerQuestion - answer the current trivia question
   *
   * @param  {type} answer The answer to the current trivia
   * @param  {type} user   The user who answered
   * @return {type}        Boolean whether the answer is correct
   */
  answerQuestion(answer, user) {
    if(this.currentQuestion
      && this.currentQuestion['correct_answer'] === answer) { //TODO partial match
      this.incrementScore(user);
      this.nextQuestion();
      return true;
    }
    return false;
  }

  addPlayer(player) {
    player.score = 0;
    super.addPlayer(player);
  }

  nextQuestion() {
    if (this.trivia.length <3) this.addTrivia(); // <3
    this.currentQuestion = this.trivia.pop();
    return this.currentQuestion;
  }

  getScoreBoard() {
    console.log('SCOREBOARD', this.players);
    return _.map(this.players, ({name, score}) => {
      return {name, score};
    });
  }

  _setTrivia(arr) {
    this.trivia = this.trivia.concat(arr);
    this.currentQuestion = arr[0];
  }
}

module.exports = TriviaSession;
