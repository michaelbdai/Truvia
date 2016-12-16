import React from 'react'
import { connect } from 'react-redux'
import { joinGame } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let JoinGame = ({ dispatch, gameID }) => {
  let input
  return(
  <MuiThemeProvider>
    <div>
      <div> Enter your name and join room: {gameID} </div>
      <form onSubmit={e =>{
        e.preventDefault()
        dispatch(joinGame(input.value, gameID))
        input.value = ''
      }}>
        <input ref = {node => {
          input = node
        }} />
        <button type = 'submit'>
            Join Game
        </button>
      </form>

    </div>
  </MuiThemeProvider>
)}

JoinGame = connect()(JoinGame);

export default JoinGame

/*

  <div>
    <div>JoinGame</div>
    <div>{gameID}</div>
  </div>

  */