const GameSession = require('./GameSession');

class TriviaSession extends GameSession {
  constructor(owner, timeout) {
    super(owner, timeout);
    this.trivia = [];
    this.currentQuestion = null;
    this.addTrivia();
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

  getCurrentQuestion() {
    return this.currentQuestion;
  }

  /**
   * incrementScore - increment player score
   *
   * @param  {type} player player obj
   * @return {type}        player's new score
   */
  incrementScore(playerName) {
    const player = this.getPlayerData(playerName);
    player.score = player.score !== undefiend ? player.score + 1 : 0;
    return player.score;
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
      && this.currentQuestion['correct_answer'] === answer) {
      this.incrementScore(user);
      this.nextQuestion();
      return true;
    }
    return false;
  }

  nextQuestion() {
    if (trivia.length < 3) this.addTrivia();
    this.currentQuestion = trivia.pop();
    return this.currentQuestion;
  }

  _setTrivia(arr) {
    this.trivia = this.trivia.concat(arr);
    this.currentQuestion = arr[0];
  }
}

module.exports = TriviaSession;
