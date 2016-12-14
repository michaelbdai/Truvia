var Rooms = require('../../models/rooms');


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
