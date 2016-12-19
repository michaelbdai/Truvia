const socketioJwt = require('socketio-jwt');
const TriviaSession = require('./TriviaSession');


/**
 * GameSessionsManager is a general sessions manager that stores GameSessions
 * and determines whether timed out sessions need to be removed automatically
 */
class GameSessionsManager {
  constructor(timeout = 1000 * 60 * 20) {
    this.timeout = timeout;
    this.gameSessions = {}; // map from id -> gameSession
    this.ownerGameSessions = {}; // map from owner -> gameSession
  }


  /**
   * createSession - factory method to create sessions
   *
   * @param  {type} Session  a type deriving from GameSession
   * @param  {Object} owner  an owner object which is a player
   * @return {Session}       created session
   */
  createSession(Session, owner) {
    const session = new Session(owner, this.timeout);

    this.gameSessions[session.id] = session;
    this.ownerGameSessions[owner.name] = session;
    this._startRemoveCheck(session.id, this.timeout);
    return session;
  }


  /**
   * createTriviaSession - factory method to create TriviaSession
   *
   * @param  {Object} owner  an owner object which is a player
   * @return {Session}       created session
   */
  createTriviaSession(owner) {
    return this.createSession(TriviaSession, owner);
  }


  /**
   * getSession - session by its ID
   *
   * @param  {String} id session id
   * @return {Session}
   */
  getSession(id) {
    return this.gameSessions[id];
  }


  /**
   * get sessions - get all sessions
   *
   * @return {Object} map from id -> Session
   */
  get sessions() { return this.gameSessions; }


  /**
   * getSessionByOwner
   *
   * @param  {Object} owner
   * @return {Session}
   */
  getSessionByOwner(owner) {
    return this.ownerGameSessions[owner.name];
  }


  /**
   * removeSession - removeSession by id
   *
   * @param  {String} id
   */
  removeSession(id) {
    const owner = this.gameSessions[id].getOwner();
    delete this.gameSessions[id];
    delete this.ownerGameSessions[owner];
  }


  /**
   * socketRestoreSession - utility function to decorate a socket with authentication
   * and session information for that socket
   *
   * @param  {Socket} sock  socket io socket
   * @param  {type} Session Session type to restore
   * @param  {Function} cb  a callback to execute the decorated socket on
   */
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

        socket.user = token.name;
        if (socket.session.getOwner().name === token.name) {
          socket.session.getOwner().socket = socket;
        }
        if (!socket.session.getPlayer(token.name)) {
          const player = { name: token.name, socket };
          socket.session.addPlayer(player);
        }

        cb(socket);
      });
  }

  _startRemoveCheck(name, timeout) {
    setTimeout(() => {
      const session = this.gameSessions[name];
      if (session._shouldRemove()) {
        this.removeSession(name);
      } else {
        timeout = session._getRemainingTime();
        this._startRemoveCheck(name);
      }
    }, timeout);
  }
}

module.exports = new GameSessionsManager();
