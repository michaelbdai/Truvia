const jwt = require('jsonwebtoken');
const _ = require('lodash');

const manager = require('../../models/GameSessionsManager');


/**
 * getSessions - Express controller that returns all GameSessionsManager sessions
 *
 */
module.exports.getSessions = function(req, res) {
  let sessions = _.map(manager.sessions, ({players, id, rounds, gameState, owner}, k) => {
    return {
      roomID: id,
      rounds,
      gameState,
      owner: owner.name,
    };
  });

  res.json(sessions);
}


/**
 * guestLogin - Express controller that determines from post data whether to
 * send a token to create a room or join a room. A session is created in GameSessionsManager
 *
 */
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
