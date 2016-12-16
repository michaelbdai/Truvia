// import * as actions from './actions';
import io from 'socket.io-client';

const listenTrivia = (socket) => {
  socket.on('user enter', (name, count) => {
    console.log(`User ${name} has entered, ${count} in room`);
    if (count === 1) {
      socket.emit('game start');
    }
  });
  socket.on('question', question => {
    console.log(question);
  });
}

const connectSocket = (roomID) => {
  console.log('... starting trivia socket connection');
  let token = window.sessionStorage.getItem('token');
  let socket = io.connect('/trivia', {
    'query': 'token=' + token
  });

  // Authentication
  socket
    .emit('authenticate', {token: token})
    .on('authenticated', () => {
      console.log('Client authorized for /trivia');
      listenTrivia(socket);
    })
    .on('unauthorized', msg => {
      console.log('Unauthorized' + JSON.stringify(msg.data));
    });
}

export default connectSocket