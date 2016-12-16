import React from 'react'
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import JoinGame from '../containers/JoinGame'
import Nav from './Nav'


const JoinGameView = ({ params: { gameID } }) => (
	<MuiThemeProvider>
		<div>
      <Nav />
      <JoinGame gameID = {gameID}/>
    </div>
	</MuiThemeProvider>

)

export default JoinGameView