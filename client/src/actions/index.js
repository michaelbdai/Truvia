import * as _ from 'lodash';
import { browserHistory } from 'react-router'

const unescape = s => _.unescape(s).replace(/&#\d+;/g, '');

export const postAnswer = (answer) => {
  // ## Susan's part - need changes
  socket.emit('answer', answer , correct => {
    console.log('Answer was ' + (!correct ? 'not correct' : 'correct'))

  });
  return {
    type: 'POST_ANSWER',
    answer
  }
}

export const getQuestion = (question, options, difficulty, number) => ({
  type: 'GET_QUESTION',
  question,
  options,
  difficulty,
  number
})

export const updateScore = (scoreObj) => {
  return {
    type: 'UPDATE_SCORE',
    scoreObj
  }
}

export const speechToText = (text) => {  // figureout how to get the text here
  return {
    type: 'SPEECH_TO_TEXT',
    text
  }
}

export const getGameInfo = (maxQuestions) => ({
  type: 'GET_GAME_INFO',
  maxQuestions,
});

const listenTrivia = (socket, isOwner) => {
  socket.on('user enter', (name, count) => {
    console.log(`User ${name} has entered, ${count} in room`);
    if (isOwner.owner && count === 1) {
      console.log('The owner triggers game start')
      let rounds = 8;
      socket.emit('game start', rounds);
      store.dispatch(getGameInfo(rounds))
    }
  });

  socket.on('question', (question, number) => {
    console.log(question.options);
    store.dispatch(getQuestion(
      unescape(question.question),
      _.map(question.options, s => unescape(s)),
      question.difficulty,
      number));
  });


  // on('ansered'): Removed the second param 'user'
  socket.on('answered', scoreObj => {
    console.log('scoreboard will be updated to ' + scoreObj);
    store.dispatch(updateScore(scoreObj));
  });

  socket.emit('scoreboard', scoreObj => {
    store.dispatch(updateScore(scoreObj));
  });

  socket.on('game end', winningUser => {
    browserHistory.push('/gameover')
    console.log('Game ended, ' + winningUser + ' won the game! :)')
  });
}

const connectSocket = (roomID, isOwner) => {
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
        console.log('ROOMID:\n' + json.roomID)
        const isOwner = json.owner;
        // Take token from json and store it persistently into sessionStorage
        window.sessionStorage.setItem('token', json.token);
        dispatch(receivePosts(data, json))
        dispatch(connectSocket(data, json, isOwner))

      });
  }
}
// getGames function here 
const getGames = (player) => {
  let data = player;
  return dispatch => {
    dispatch(sendRequest);
    return fetch('/api/sessions', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
     })
    .then(res => res.text())
    .then(json => {
      console.log(json);
      dispatch(receiveGames(json))
    });
  }
}



const sendRequest = () => {
  return{
    type: 'SEND_REQUEST'
  }
}

const receivePosts = (data, json) => {
  //TODO: !!! add the following
  // console.log('receivePosts')
  // //--------------need to test
  // if (data.roomID){ // user try to join room
  //   if (json.sucess) {
  //     hashHistory.push('/game')
  //      return {
  //       type: 'JOIN_GAME',
  //       gameID: data.roomID,
  //       gameHost: data.name
  //     }
  //   } else {
  //     //alert
  //     hashHistory.push('/joinGame')
  //     return {type:''}
  //   }

  // } else { // user try to create room
  //   hashHistory.push('/game')
  //   return {
  //     type: 'CREATE_GAME',
  //     gameID: json.roomID,
  //     gameHost: data.name
  //   }
  // }



  // //----------------
  // hashHistory.push('/game')



  browserHistory.push('/game')
  return {
    type: 'CREATE_GAME',
    gameID: json.roomID,
    gameHost: data.name
  }

}
const receiveGames = (games) => { // games is an array of player information
  console.log(games);

  browserHistory.push('/showGames')
  return {
    type: 'GET_ONGOING_GAMES',
    games
  }
}

export const createGame = (gameHost) => {
  return(dispatch) => {
    dispatch(postGuest(gameHost))
  }
}
// go to the games page , get the games, update the games state with all the currently streaming games
// 
// games page should display all the games by reflecting the changes in the state.


export const ongoingGames = (games) => { // this should have state of list of ongoing games and name of the player
  console.log("inside actioncreator ongoing games");
  
  return(dispatch) => {
    console.log(dispatch);
    dispatch(getGames(games));
  }
}

export const joinGame = (guestName, roomID) => {
  return(dispatch) => {
    dispatch(postGuest(guestName, roomID))
  }
}
