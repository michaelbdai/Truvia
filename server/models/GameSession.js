const sid = require('shortid');



/**
 * The GameSession class is an abstraction for a session that automatically times
 * out after no activity. It stores player information objects and contains
 * a simple game phase state.
 */
class GameSession {
  constructor(owner, timeout) {
    this.players = {};
    this.timeout = timeout;
    this.id = sid.generate();
    this.expireAt = Date.now() + this.timeout;
    this.addPlayer({name: owner});
    this.owner = this.players[owner];
    this.gameState = 'lobby';
  }

  /**
   * addPlayer - Adds a player object to the session. Player 'name' key must be
   * unique.
   *
   * @param  {Object} player player object that must contain a 'name' key
   * @return {Object}        the same player object
   */
  addPlayer(player) {
    this._preventExpire();

    // Do checks for valid player names
    if (player.name.length <3)
      throw `Player name, '${player.name}', must be at least 3 characters`;
    if (!/^[a-zA-Z0-9]*$/.test(player.name))
      throw `Player name, '${player.name}' must only contain only charactters A-Z, a-z, or 0-9`;
    if (this.players[player.name])
      throw `Player ${player.name} already exists`;

    player.id = sid.generate();
    this.players[player.name] = player;

    return player;
  }


  /**
   * removePlayer - removes a player by name from the session
   *
   * @param  {String} playerName name of the player to remove
   * @return {Object}            player object that was removed
   */
  removePlayer(playerName) {
    this._preventExpire();
    const playerData = this.players[playerName];
    if (playerData) this.players[playerName] = undefined;
    return playerData;
  }


  /**
   * updatePlayerData - takes a function to modify the player's object
   *
   * @param  {String} playerName player's name that should be updated
   * @param  {Function} fn       update function that accepts the player object and returns a new player object
   * @return {Object}            modified player object
   */
  updatePlayerData(playerName, fn) {
    this._preventExpire();
    const data = this.players[playerName];
    this.players[playerName] = fn(data);
    return this.players[playerName];
  }


  /**
   * getPlayer - get player by name
   *
   * @param  {String} playerName
   * @return {Object}            player object
   */
  getPlayer(playerName) {
    this._preventExpire();
    return this.players[playerName];
  }


  /**
   * setPlayerData - sets a players data to a new object
   *
   * @param  {String} playerName
   * @param  {Object} data       new player object
   */
  setPlayerData(playerName, data) {
    this._preventExpire();
    this.players[playerName] = data;
  }


  /**
   * getOwner - gets owner object of the session, owner is a player
   *
   * @return {type}
   */
  getOwner() {
    this._preventExpire();
    return this.owner;
  }


  /**
   * getPlayers - returns all players of this session
   *
   * @return {Object}  Object of player objects
   */
  getPlayers() {
    this._preventExpire();
    return this.players;
  }

  /**
   * getPlayersCount - number of players in game
   *
   * @return {Number}
   */
  getPlayersCount() { return Object.keys(this.players).length; }

  /**
   * setGameState - set the game state
   *
   * @param  {type} state
   */
  setGameState(state) { this.gameState = state; }

  /**
   * start - sets the game state to 'started'
   */
  start() { this.gameState = 'started'; }

  /**
   * stop - set the game state to 'stopped'
   */
  stop() { this.gameState = 'stopped'; }


  /**
   * running - whether the game is running
   *
   * @return {Boolean}
   */
  running() { return this.gameState === 'started'; }

  /**
   * stopped - whether the game has stopped
   *
   * @return {Boolean}
   */
  stopped() { return this.gameState === 'stopped'; }

  _preventExpire() {
    this.expireAt = Date.now() + this.timeout;
  }

  _shouldRemove() {
    return this.expireAt < Date.now();
  }

  _getRemainingTime() {
    return Date.now() - this.expireAt;
  }
}

module.exports = GameSession;
