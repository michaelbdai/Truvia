/*
* rooms class for dynamically storing rooms
*
* functions:
* makeRoom
* getRoom
* getRooms
*/

var Rooms = function() {
  var roomStore = {};
  /*
  * individual room class, requires a name
  * if a player is removed and the room becomes
  * empty it is destroyed
  *
  * stores a room's individual trivia retrieved elsewhere
  * 
  */
  var Room = function(name) {
    if(!name){
      return null;
    } else {
      var players = {}
      var numPlayers = Object.keys(players).length
      var trivia = [];
      var currentTrivia = null;
      this.destroy = function() {
        delete roomStore[name];
      }
      this.addTrivia = function(trivia) {
        if(Array.isArray(trivia)) {        
          trivia = trivia.concat(trivia);
        } else {
          throw new Error('add trivia requires array argument');
        }
      }
      this.getTrivia = function() {
        currentTrivia = trivia.pop();
        return currentTrivia;
      }
      this.addPlayer = function(player) {
        if(players[player] === undefined) {
          players[player] = 0;
          numPlayers = Object.keys(players).length;
        } else {
          console.log('that player exists');
        }
      }
      this.incrementScore = function(player) {
        if(players[player] !== undefined) {
          players[player]++;
          return players[player];
        } else {
          console.log('no such player')
        }
      }
      this.removePlayer =  function(player, persist) {
        delete players[player];
        if(!persist && Object.keys(players).length < 1 ) {
          this.destroy();
        }
        return this;
      }
      this.getPlayer = function(player) {
        if(players[player] === undefined) {
          return null;
        } else {
          return {name: player, score: players[player]};
        }
      }
      this.getPlayers = function() {
        var arr = []
        for(var key in players) {
          arr.push({name: key, score: players[key]})
        }
        return arr;
      }
    }
  }
  //no return value, requires at least one string input, second is optional
  this.makeRoom = function(room, player) {
      if(!((typeof room) === 'string' && room.length > 1)) {
        console.log('must have a room name');
      } else if(roomStore[room]) {
        console.log('that room exists')
      } else {
        roomStore[room] = new Room(room)
        if(Object.keys(roomStore[room]).length < 1) {
          console.log('unkown error making room');
        } else {
          if((typeof player) === 'string' && player.length > 0){
            console.log('zoopy')
            roomStore[room].addPlayer(player);
          }
        }
      }
  }
  //returns undefined or room object
  this.getRoom = function(room) {
    return roomStore[room];
  }
  //returns array of room objects(may be empty)
  this.getRooms = function() {
    var arr = [];
    for(var key in roomStore) {
      arr.push({key: roomStore[key]})
    }
    return arr;
  }
}

module.exports = new Rooms();

// var store = new Rooms();
// store.makeRoom('jigga')
// var myRoom = store.getRoom('jigga')
// myRoom.addPlayer('john')
// myRoom.incrementScore('john');
// console.log(myRoom.getPlayers())
// console.log(myRoom.getPlayer('john'))
// myRoom.destroy();
// console.log(store.getRooms());