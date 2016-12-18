const GameSession = require('./GameSession');
const _ = require('lodash');

class TriviaSession extends GameSession {
  constructor(owner, timeout, rounds = 8) {
    super(owner, timeout);
    this.trivia = [];
    this.currentQuestion = null;
    this.rounds = rounds;
    this.questionNumber = 1;
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

   // ALOGIRTHM
   // Get largest substrings
      // Start searching for largest substrings
      // If found substr add to list `matchSubstr` as ms
      // Add to list as [pos of sub in orig string, substr length]
      // Remove substr from looped scanned substr
      // Try find smaller substr
  // Find max in order substrs
      // let scores
      // For each substr `s` in `ms`
          // score = s length
          // For each substr `j` in `ms`.slice(s.idx)
            // score += j length if s idx < j idx (in order)
      // return max scores
  // _getLargestSubstringsRemoved(str) {
  //   _.map(str, (c, i) => [c, i])
  // }
  //
  // _scoreMatch(str1, str2) {
  //   if (str1.includes(str2)) return 9001;
  //
  //
  // }
  // pickMostSimilar(options, str) {
  //   _.map(options, opt => {
  //     // make both lowercase
  //   })
  // }
  answerQuestion(answer, user) {
    if(this.currentQuestion
      && this.currentQuestion['correct_answer'] === answer) { //TODO partial match
      this.incrementScore(user);
      this.nextQuestion();
      this.questionNumber++;
      return true;
    }
    return false;
  }

  getQuestionNumber() { return this.questionNumber; }
  getRounds() { return this.rounds; }
  setRounds(rounds) { this.rounds = rounds; }
  gameShouldEnd() { return this.questionNumber > this.rounds; }

  addPlayer(player) {
    player.score = 0;
    console.log('ts ' + player.socket);
    super.addPlayer(player);
  }

  nextQuestion() {
    if (this.trivia.length <3) this.addTrivia(); // <3
    this.currentQuestion = this.trivia.pop();
    return this.currentQuestion;
  }

  getScoreBoard() {
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
