import * as _ from 'lodash';
import io from 'socket.io-client';
export const postAnswer = () => ({
  type: 'POST_ANSWER'
})

export const getQuestion = () => ({
  type: 'GET_QUESTION'
})

export const recordVoice = (filepath) => {
  console.log(filepath);
  return {
    type: 'RECORD_VOICE',
    filepath
  }
};

export const skipQuestion = () => ({
  type: 'SKIP_QUESTION'
})
const sendRequest = () => {
  return{
    type: 'SEND_REQUEST'
  }
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
const postGuest = (name, roomID) => {
  console.log('postGame')
  // let data = _.omitBy({name, roomID}, _.isUndefined);
  let data = roomID ? {name: name} : {name: name, roomID: roomID}
  return dispatch => {
      dispatch(sendRequest)
      return fetch('http://localhost:8080/guest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log('CreateGame POST data from /guest ->', json);
        // Take token from json and store it persistently into sessionStorage
        window.sessionStorage.setItem('token', json.token);
        dispatch(connectSocket(json.roomID))
        dispatch(receivePosts(data, json))
      });
  }
const receivePosts = (data, json) => {
  console.log(json);
  return {
    type: 'CREATE_GAME',
    gameID: json.roomID,
    gameHost: data.name
  } 

}

}
export const createGame = (gameHost) => {
  console.log('createGame');
  return(dispatch) => {
    dispatch(postGuest(gameHost))
  }  
}
export const joinGame = (guestName, roomID) => {
  return(dispatch) => {
    dispatch(postGuest(guestName, roomID))
  }  
} 


