var expect = require('chai').expect;
require('socket.io-client');

describe('Trivia Socket Interface', function() {
  const players = [];
  const tokens = [];
  before(function(done) {
    // Create a few users and sockets with tokens
    // Need to require server socket and start it
    fetch('/guest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Susan'
      })
    })
      .then(res => res.json())
      .then(json => {
        tokens.push(json.token);
        connectSocket(json.roomID);
      });
  });
});
