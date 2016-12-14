const Rooms = require('../../models/rooms');
const sid = require('shortid');
const jwt = require('jsonwebtoken');

const unmarkAnswers = triviaObject => {
  triviaObject.incorrect_answers.push(triviaObject.correct_answer);
  const options = triviaObject.incorrect_answers.slice();
  delete triviaObject.incorrect_answers;
  delete triviaObject.correct_answer;
  triviaObject['options'] = options;
  return triviaObject;
}

exports.getAll = function(req, res) {
  let rooms = Rooms.getRooms();
  for (let k in rooms) {
    rooms[k].trivia = rooms[k].trivia.map(unmarkAnswers);
  }
  res.json(rooms);
}

exports.createOne = async function(req, res) {
  let room;
  try {
    room = await Rooms.makeRoom(req.body.roomname, req.body.user);
  } catch (e) { console.warn(e) }

  const result = { roomName: room.name, players: room.players };
  res.json(result);
}

module.exports.guestLogin = async function(req, res) {
  // TODO use redis to persist user temporarily with timeout
  let response;
  let user = req.body.name;

  if (!user) {
    return res.json({ success: false, message: 'Name required for guest login'});
  }
  let roomID = req.body.roomID;
  if (roomID) {
    const room = Rooms.getRoom(roomID);
    response = room ? {
      success: true,
      message: user + ' joined room ' + room.id,
      roomOwner: room.owner,
      token: jwt.sign({ user: user, roomID: room.id, owner: false }, jwtSecret)
    } : {
      success: false,
      message: 'Room does not exist',
    };
  } else {
    const room = await Rooms.makeRoom(sid.generate(), user); // TODO room needs to have ID
    response = {
      success: true,
      message: 'Room created for ' + user,
      roomID: room.id,
      token: jwt.sign({ user: user, roomID: room.id, owner: true }, jwtSecret)
    };
  }

  res.json(response);
}
