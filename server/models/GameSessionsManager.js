const uuid = require('uuid/v4');
const socketioJwt = require('socketio-jwt');
// const GameSession = require('./GameSession');

// Should delete session after no activity
class GameSessionsManager {
  constructor(timeout = 1000 * 60 * 20) {
    this.timeout = timeout;
    this.gameSessions = {}; // map from id -> gameSession
    this.ownerGameSessions = {}; // map from owner -> gameSession
  }

  createSession(Session, owner, name = uuid()) {
    const session = new Session(owner, this.timeout);

    this.gameSessions[name] = session;
    this.ownerGameSessions[owner.name] = session;
    this.startRemoveCheck(name, this.timeout);
    return session;
  }

  // createTriviaSession(owner, name = uuid()) {
  //   return this.createSession(TriviaSession, owner, name);
  // }

  startRemoveCheck(name, timeout) {
    setTimeout(() => {
      const session = this.gameSessions[name];
      if (session._shouldRemove()) {
        this.removeSession(name);
      } else {
        timeout = session._getRemainingTime();
        this.startRemoveCheck(name);
      }
    }, timeout);
  }

  getSession(name) {
    return this.gameSessions[name];
  }

  getSessionByOwner(owner) {
    return this.ownerGameSessions[owner.name];
  }

  removeSession(name) {
    const owner = this.gameSessions[name].getOwner();
    delete this.gameSessions[name];
    delete this.ownerGameSessions[owner];
  }

  socketRestoreSession(sock, Session, cb) {
    sock
      .on('connection', socketioJwt.authorize({
        secret: jwtSecret,
        timeout: 15000
      }))
      .on('authenticated', (socket) => {
        const token = socket.decoded_token;
        console.log('User authenticated socket with token: ' +
          JSON.stringify(token, null, 2));

        socket.session = socket.session || this.getSession(token.roomID);
        if (!socket.session && token.owner) {
          const owner = { name: token.name, socket };
          socket.session = this.createSession(Session, owner, token.roomID);
        }
        // else {
        //   socket.emit('error', 'Game can only be created by owner');
        //   socket.disconnect();
        // }
        socket.user = token.name;

        if (!socket.session.getPlayer(token.name)) {
          socket.session.addPlayer({ name: token.name, socket });
        }

        cb(socket);
      });
  }
}

module.exports = new GameSessionsManager();
// const manager = new GameSessionsManager(5000);
// let name = manager.createSession(GameSession);
// console.log('Now ', manager.getSession(name));
// setTimeout(() => console.log('Then ', manager.gameSessions), 4000);
