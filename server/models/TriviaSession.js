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

  async getCurrentQuestion() {
    if (!this.currentQuestion) await this.addTrivia();
    return this.currentQuestion;
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

  _getLargestSubstringsRemoved(str1, str2) {
    let subStrs = [];
    let set = str1.slice();
    for (let len = str1.length; len > 0; len--) {
      for (let j = 0; j + (len - 1) < str1.length; j++) {
        let s = str1.slice(j, j + len);
        let setIdx = set.indexOf(s);
        if (setIdx !== -1) {
          let idx = str2.indexOf(s);
          if (idx !== -1) {
            subStrs.push([idx, len, j]);
            set = set.slice(0,setIdx) + set.slice(setIdx + len)
          }
        }
      }
    }
    return _.uniqBy(subStrs, ([i, l]) => i)
      .sort((a,b) => a[2] - b[2]);
  }

  _scoreMatch(str1, str2) {
    let subStrs = this._getLargestSubstringsRemoved(str1, str2);
    let scores = _.map(subStrs, ([i, l], si) => {
      let score = l;
      _.each(subStrs.slice(si + 1), ([j, l2]) => {
        if (i < j) {
          score += l2;
        }
      });
      return score;
    });
    return _.max(scores);
  }

  _pickMostSimilar(str, options) {
    str = str.toLowerCase()//_.lowerCase(str);
    let optionScores = _.map(options, (opt, i) => {
      let optl = opt.toLowerCase();
      return [i, this._scoreMatch(str, optl)];
    });
    console.log('OPTION SCORES ' + JSON.stringify(optionScores));
    let optionIdx = _.maxBy(optionScores, ([idx, score]) => score)[0];
    return options[optionIdx];
  }

  _scrubQuestion(question) {
    let q = _.cloneDeep(question);
    q.incorrect_answers.push(q.correct_answer);
    const options = q.incorrect_answers.slice();
    delete q.incorrect_answers;
    delete q.correct_answer;
    q['options'] = options;
    return q;
  }

  answerQuestion(answer, user) {
    if (!this.currentQuestion) return false;
    console.log('Q', this.currentQuestion);
    let options = this._scrubQuestion(this.currentQuestion).options;
    console.log('OPTIONS ARE ' + JSON.stringify(options));
    let picked = this._pickMostSimilar(answer, options);
    console.log('PICKED ' + picked)
    if(this.currentQuestion['correct_answer'] === picked) { //TODO partial match
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
