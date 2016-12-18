import * as _ from 'lodash';
import { browserHistory } from 'react-router'
//import { streamSpeech } from '../components/Watson';
export const postAnswer = (answer) => {
  socket.emit('answer', answer , correct => console.log('Answer was ' + (!correct ? 'not correct' : 'correct')));
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
  return {
    type: 'UPDATE_SCORE',
    scoreObj
  }
}
// export const addToPlayerlist = (newPlayer) => {
//   return {
//     type: 'ADD_TO_PLAYERLIST',
//     newPlayer
//   }
// }
export const speechToText = (text) => {  // figureout how to get the text here
  console.log("speechToText");
  return {
    type: 'SPEECH_TO_TEXT',
    text
  }
}

const listenTrivia = (socket, isOwner) => {
  socket.on('user enter', (res) => {
    console.log(res)
    console.log(`User ${res.name} has entered, ${res.count} in room`);
    store.dispatch(updateScore(res.scoreObj))
    // if (isOwner.owner && count === 2) {
    //   console.log('The owner triggers game start')
    //   socket.emit('game start');
    // }
  });

  socket.on('question', question => {
    store.dispatch(getQuestion(question.question, question.options, question.difficulty));
  });

  socket.on('answered', user => {
    console.log(user + ' answered the question correctly!');
  });

  socket.emit('scoreboard', scoreObj => {
    store.dispatch(updateScore(scoreObj));
  });

  socket.on('game started', () => {
    console.log('host started the game');
    store.dispatch(directToGame());
  });

  socket.on('game end', winningUser => {
    console.log('Game ended, ' + winningUser + ' won the game! :)')
  });

}

const connectSocket = (isOwner) => {
  console.log('... starting trivia socket connection');
  let token = window.sessionStorage.getItem('token');
  // Once socket connected, store as window variable
  let socket = window.socket;
  // Authentication
  socket
    .emit('authenticate', {token: token})
    .on('authenticated', () => {
      console.log('Client authorized for /trivia');
      listenTrivia(socket, isOwner);
    })
    .on('unauthorized', msg => {
      console.log('Unauthorized' + JSON.stringify(msg.data));
    });
}
const directToGame = () => {
  browserHistory.push('/game')
  return {
    type: 'START_GAME'
  }
}

const postGuest = (name, roomID) => {
  let data = roomID ? {name: name, roomID: roomID} : {name: name}
  return dispatch => {
      dispatch(sendRequest)
      return fetch('/api/guest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        console.log('CreateGame POST data from /guest ->', json);
        const isOwner = json.owner;
        // Take token from json and store it persistently into sessionStorage
        window.sessionStorage.setItem('token', json.token);
        dispatch(receivePosts(data, json))
        dispatch(connectSocket(isOwner))

      });
  }
}
const sendRequest = () => {
  return{
    type: 'SEND_REQUEST'
  }
}

const receivePosts = (data, json) => {
  console.log(json);
  //TODO: !!! add the following
  console.log('receivePosts')
  //--------------need to test
  if (data.roomID){ // user try to join room
    if (json.success) {
      console.log('join sucess')
      browserHistory.push('/lobby')
       return {
        type: 'JOIN_GAME',
        gameID: data.roomID,
        gameHost: json.roomOwner,
        userName: data.name,
      }     
    } else {
      //alert
      console.log('join fail--------')
      browserHistory.push('/')
      return {type:''}
    }

  } else { // user try to create room
    browserHistory.push('/lobby')
    return {
      type: 'CREATE_GAME',
      gameID: json.roomID,
      gameHost: data.name,
      userName: data.name
    }      
  }

  // //----------------
  // hashHistory.push('/game')

  // browserHistory.push('/lobby')
  // return {
  //   type: 'CREATE_GAME',
  //   gameID: json.roomID,
  //   gameHost: data.name
  // }

}

export const createGame = (gameHost) => {
  console.log('createGame')
  return(dispatch) => {
    dispatch(postGuest(gameHost))
  }
}

export const joinGame = (guestName, roomID) => {
  return(dispatch) => {
    dispatch(postGuest(guestName, roomID))
  }
}

export const startGame = () => {
  console.log('game starts')
  socket.emit('game start');

}
