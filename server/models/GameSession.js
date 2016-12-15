const uuid = require('uuid/v4');

// Should not allow duplicate players
class GameSession {
  constructor(owner, timeout) {
    this.players = {};
    this.timeout = timeout;
    this.expireAt = Date.now() + this.timeout;
    this.addPlayer(owner);
  }

  preventExpire() {
    this.expireAt += this.timeout;
  }

  addPlayer(player) {
    this.preventExpire();
    if (player.name.length < 3)
      throw `Player name, '${player.name}', must be at least 3 characters`;
    if (!/^[a-zA-Z0-9]*$/.test(player.name))
      throw `Player name, '${player.name}' must only contain only charactters A-Z, a-z, or 0-9`;
    if (this.players[player.name])
      throw `Player ${player.name} already exists`;
    player.id = uuid();
    this.players[player.name] = player;
  }

  removePlayer(playerName) {
    this.preventExpire();
    const playerData = this.players[playerName];
    if (playerData) this.players[playerName] = undefined;
    return playerData;
  }

  updatePlayerData(playerName, fn) {
    const data = this.players[playerName];
    this.players[playerName] = fn(data);
  }

  getPlayerData(playerName) {
    return this.players[playerName];
  }

  setPlayerData(playerName, data) {
    this.players[playerName] = data;
  }

  getOwner() {
    return this.owner;
  }

  getPlayers() {
    return this.players;
  }

  _shouldRemove() {
    return this.expireAt < Date.now();
  }

  _getRemainingTime() {
    return Date.now() - this.expireAt;
  }
}

module.exports = GameSession;
