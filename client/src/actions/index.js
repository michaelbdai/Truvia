import * as _ from 'lodash';
import { hashHistory } from 'react-router'

export const postAnswer = (answer) => {
  console.log('posted');
  socket.emit('answer', answer, ()=> console.log('cb'));
  return {
    type: 'POST_ANSWER',
    answer
  }
}

export const getQuestion = (question, options, difficulty) => ({
  type: 'GET_QUESTION',
  question,
  options,
  difficulty
})

export const updateScore = (scoreObj) => {
  console.log( 'from action');
  return {
    type: 'UPDATE_SCORE',
    scoreObj
  }
}

const listenTrivia = (socket) => {
  socket.on('user enter', (name, count) => {
    console.log(`User ${name} has entered, ${count} in room`);
    if (count === 1) {
      socket.emit('game start');
    }
  });
  socket.on('question', question => {
    console.log(question);
    store.dispatch(getQuestion(question.question, question.options, question.difficulty));
  });
  // ## added
  socket.on('answered', user => {
    console.log(user + ' answered the question')
    // ## The question will be changed anyways
    // ## TODO: How do I know if this is correct or not?
    // store.dispatch(updateScore(user))
    // socket.emit('al')
  });
  socket.on('end', user => {
    console.log(user+ ' answered, and more than 8 correct')
  });
  socket.emit('scoreboard', scoreObj => {
    console.log(scoreObj);
    store.dispatch(updateScore(scoreObj));
  })

}
const connectSocket = (roomID) => {
  console.log('... starting trivia socket connection');
  let token = window.sessionStorage.getItem('token');
  // window.socket = io.connect('/trivia');
  let socket = window.socket;
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
const sendRequest = () => {
  return{
    type: 'SEND_REQUEST'
  }
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
        dispatch(receivePosts(data, json))
        dispatch(connectSocket(data, json))

      });
  }
}
const receivePosts = (data, json) => {
  console.log('receivePosts')
  hashHistory.push('/game')
  return {
    type: 'CREATE_GAME',
    gameID: json.roomID,
    gameHost: data.name
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



