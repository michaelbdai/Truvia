// const Rooms = require('../../models/rooms');
const jwt = require('jsonwebtoken');
const manager = require('../../models/GameSessionsManager');
const _ = require('lodash');
// exports.getAll = function(req, res) {
//   let rooms = Rooms.getRooms();
//   for (let k in rooms) {
//     rooms[k].trivia = rooms[k].trivia.map(unmarkAnswers);
//   }
//   res.json(rooms);
// }
//
// exports.createOne = async function(req, res) {
//   let room;
//   try {
//     room = await Rooms.makeRoom(req.body.roomname, req.body.user);
//   } catch (e) { console.warn(e) }
//
//   const result = { roomName: room.name, players: room.players };
//   res.json(result);
// }

module.exports.getSessions = function(req, res) {
  let sessions = _.map(manager.sessions, ({players, id, rounds, gameState, owner}, k) => {
    // JSON.stringify(players);
    JSON.stringify(id);
    JSON.stringify(rounds);
    JSON.stringify(gameState);
    JSON.stringify(owner.name);
    return {
      //players,
      roomID: id,
      rounds,
      gameState,
      owner: owner.name,
    };
  });

  res.json(sessions);
}


module.exports.guestLogin = function(req, res) {
  // TODO use redis to persist user temporarily with timeout
  let response;
  let user = req.body.name;

  try {
    if (!user) {
      return res.json({ success: false, message: 'Name required for guest login'});
    }
    let roomID = req.body.roomID;
    if (roomID) {
      const room = manager.getSession(roomID);
      response = room ? {
        success: true,
        name: user,
        message: user + ' joined room ' + room.id,
        roomOwner: room.owner.name,
        owner: false,
        token: jwt.sign({ name: user, roomID: room.id, owner: false }, jwtSecret)
      } : {
        success: false,
        message: 'Room does not exist',
      };
    } else {
      const room = manager.createTriviaSession(user); // TODO room needs to have ID
      response = {
        success: true,
        name: user,
        message: 'Room created for ' + user,
        roomID: room.id,
        owner: true,
        token: jwt.sign({ name: user, roomID: room.id, owner: true }, jwtSecret)
      };
    }
  } catch (error) {
    response = {success: false, error };
  }

  res.json(response);
}
