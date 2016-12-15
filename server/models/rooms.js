/**
* rooms class for dynamically storing rooms
*
* functions:
* makeRoom
* getRoom
* getRooms
*/
const _ = require('lodash');

/** Class representing all Rooms */
class Rooms {
  constructor() {
    this.roomStore = {};
  }
  /**
   * async makeRoom - Add a room to the room object, with an initial player. Trivia
   * is automatically added to the room.
   *
   * @param  {type} id       ID of the room
   * @param  {type} owner    Name of room's owner
   * @return {type}          Promise of the room that is created
   */
  async makeRoom (id, owner) {
    if (this.roomStore[id]) return this.roomStore[id];
    const room = new Room(id, owner);
    this.roomStore[id] = room;
    await room.addTrivia();
    return room;
  }

  /**
   * getRoom - Retrieves room by room name
   *
   * @param  {type} roomName The room name to retrieve
   * @return {type}          The found {Room} object
   */
  getRoom(id) {
    return this.roomStore[id];
  }

  getRooms() {
    return this.roomStore;
  }
}

class Room {
  constructor(id, owner) {
    this.id = id;
    this.players = {};
    this.owner = owner;
    this.trivia = [];
    this.currentTrivia = null;
  }

  /**
   * async addTrivia - add trivia to this Room object
   *
   * @return {type}  undefined
   */
  async addTrivia() {
    const data = await fetch('https://www.opentdb.com/api.php?amount=10');
    const triviaJSON = await data.json();
    this._setTrivia(triviaJSON.results);
  }

  /**
   * async getTriviaQuestion - Get one trivia question object
   *
   * @return {type}  Trivia question object
   */
  async getTriviaQuestion() {
    if (trivia.length < 5) await this.addTrivia();
    currentTrivia = trivia.pop();
    return currentTrivia;
  }

  /**
   * async getTrivia - return a client formatted Trivia object
   *
   * @return {type}  client Trivia w/ object keys {categoriy, quesitons, answers}
   */
  async getTrivia() {
    let trivia = await getTriviaQuestion();
    let possible = trivia['incorrect_answers'].slice();
    possible.push(trivia['correct_answer']);
    return {
      category: trivia['category'],
      question: trivia['question'],
      answers: possible
    };
  }


  /**
   * answerQuestion - answer the current trivia question
   *
   * @param  {type} answer The answer to the current trivia
   * @param  {type} user   The user who answered
   * @return {type}        Boolean whether the answer is correct
   */
  answerQuestion(answer, user) {
    if(currentTrivia['correct_answer'] === answer
        && this.getPlayer(user)
        && user && answer && currentTrivia) {
      this.incrementScore(user);
      this.getTriviaQuestion();
      return true;
    }
    return false;
  }

  _setTrivia(arr) { this.trivia = arr; this.currentTrivia = arr[0];}


  /**
   * incrementScore - increment player score
   *
   * @param  {type} player player name
   * @return {type}        player's new score
   */
  incrementScore(player) {
    this.players[player] = this.players[player] || 0;
    this.players[player]++;
    return this.players[player];
  }


  /**
   * removePlayer - deletes a player's score
   *
   * @param  {type} player player name
   * @return {type}        description
   */
  removePlayer(player) {
    delete this.players[player];
  }


  /**
   * addPlayer - adds a player to the room
   *
   * @param  {type} name player name
   * @return {type}      player score
   */
  addPlayer(name) {
    this.players[name] = 0;
    return this.players[name];
  }

  /**
   * getPlayer - get player object
   *
   * @param  {type} player player name
   * @return {type}        object of {name: String, score: Number}
   */
  getPlayer(player) {
    return this.players[player] !== undefined ?
      { name: player, score: this.players[player] }
      : null;
  }


  /**
   * getPlayers - get all player objects
   *
   * @return {type}  [{name: String, score: Number}, ...]
   */
  getPlayers() {
    return _.map(this.players, (v, k) => this.getPlayer(k));
  }
}

module.exports = new Rooms();

// var store = new Rooms();

// store.makeRoom('jigga').then(function() {
//   var myRoom = store.getRoom('jigga')
//   myRoom.addPlayer('john')
//   myRoom.incrementScore('john');
//   console.log(myRoom.getPlayers())
//   console.log(myRoom.getPlayer('john'))
//   console.log(store.getRooms());
//   console.log(myRoom._getAllTrivia(), 'my')
//   myRoom.addTrivia().then(function() {
//     console.log(myRoom.getTrivia())
//   })

// })
