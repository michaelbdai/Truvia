import { browserHistory } from 'react-router'
import * as _ from 'lodash';
const unescape = s => _.unescape(s).replace(/&.+;/g, '');

export const getGameInfo = (maxQuestions) => ({
  type: 'GET_GAME_INFO',
  maxQuestions,
})

export const getQuestion = (question, options, difficulty, number) => ({
  type: 'GET_QUESTION',
  question,
  options,
  difficulty,
  number,
})

export const updateRoundWinner = (roundWinner) => ({
  type: 'UPDATE_ROUND_WINNER',
  roundWinner,
})

export const updateScore = (scoreObj) => ({
  type: 'UPDATE_SCORE',
  scoreObj,
})

export const activateMic = (state) => {
  console.log('mic state is now ' + state)
  return{
    type: 'ACTIVATE_MIC',
    state,
  }
}

export const speechToText = (text) => ({  // figureout how to get the text here
  type: 'SPEECH_TO_TEXT',
  text,
})

export const doneRecording = (text) => ({
  type: 'SUBMIT_SPEECH',
  text,
})


const listenTrivia = (socket, isOwner) => {
  socket.on('user enter', (res) => {
    console.log(`User ${res.name} has entered, ${res.count} in room`);
    store.dispatch(updateScore(res.scoreObj))
  });

  socket.on('question', (question, number) => {
    console.log(question.options);
    store.dispatch(getQuestion(
      unescape(question.question),
      _.map(question.options, s => unescape(s)),
      question.difficulty,
      number));
  });

  socket.on('answered', (scoreObj, roundWinner ) => {
    console.log('scoreboard will be updated to ' + scoreObj)
    store.dispatch(updateScore(scoreObj))
    store.dispatch(updateRoundWinner(roundWinner))
    store.dispatch(timedShowDialog())
  });

  socket.emit('scoreboard', scoreObj => {
    store.dispatch(updateScore(scoreObj))
  });

  socket.on('game started', () => {
    console.log('host started the game')
    store.dispatch(directToGame())
  });

  socket.on('game end', winningUser => {
    browserHistory.push('/gameover')
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
        console.log('CreateGame POST data from /api/guest ->', json);
        const isOwner = json.owner;
        // Take token from json and store it persistently into sessionStorage
        window.sessionStorage.setItem('token', json.token);
        dispatch(receivePosts(data, json))
        connectSocket(isOwner)
      });
  }
}

const getGames = (playerName) => {
  return dispatch => {
    dispatch(sendRequest)
    return fetch('/api/sessions', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     })
    .then(res => res.json())
    .then(json => {
      let lobbyGames = json.filter(game => game.gameState === 'lobby')
      console.log('getGames array ' + lobbyGames)
     dispatch(receiveGames(lobbyGames, playerName))
    })
  }
}

const sendRequest = () => {
  return{
    type: 'SEND_REQUEST'
  }
}

const receivePosts = (data, json) => {
  if (data.roomID){ // user try to join room
    if (json.success) {
      browserHistory.push('/lobby')
       return {
        type: 'JOIN_GAME',
        gameID: data.roomID,
        gameHost: json.roomOwner,
        userName: data.name,
      }
    } else {
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
}

const receiveGames = (games, userName) => { // games is an array of player information
  browserHistory.push('/showGames')
  return {
    type: 'GET_ONGOING_GAMES',
    games,
    userName,
  }
}

export const setRounds = (rounds) => ({
  type: 'SET_ROUNDS',
  rounds,
})

export const createGame = (gameHost, rounds) => {
  return(dispatch) => {
    dispatch(postGuest(gameHost))
    dispatch(setRounds(rounds))
  }
}

export const ongoingGames = (name) => {
  return(dispatch) => {
    dispatch(getGames(name));
  }
}

export const joinGame = (guestName, roomID) => {
  return(dispatch) => {
    dispatch(postGuest(guestName, roomID))
  }
}

export const startGame = () => {
  const rounds = store.getState().rounds;
  socket.emit('game start', rounds);
  store.dispatch(getGameInfo(rounds))
}

export const timedShowDialog = () => {
  return (dispatch) => {
    dispatch({type: 'SHOW_ROUND_DIALOG'})
    setTimeout(() => dispatch({type: 'HIDE_ROUND_DIALOG'}), 1000)

  }
}

export const timedShowWrongDialog = () => {
  return (dispatch) => {
    dispatch({type: 'SHOW_WRONG_DIALOG'})
    setTimeout(() => dispatch({type: 'HIDE_WRONG_DIALOG'}), 1000)
  }
}
