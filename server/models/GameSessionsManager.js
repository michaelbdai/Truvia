const uuid = require('uuid/v4');
const TriviaSession = require('./TriviaSession');
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

  createTriviaSession(owner, name = uuid()) {
    return this.createSession(TriviaSession, owner, name);
  }

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
}

module.exports = new GameSessionsManager();
// const manager = new GameSessionsManager(5000);
// let name = manager.createSession(GameSession);
// console.log('Now ', manager.getSession(name));
// setTimeout(() => console.log('Then ', manager.gameSessions), 4000);
