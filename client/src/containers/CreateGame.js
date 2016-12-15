import React from 'react'
import { connect } from 'react-redux'
import { createGame } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let CreateGame = ({ dispatch }) => {
	let input
	return (
	<MuiThemeProvider>
		<div>
			<div> Please enter your name and create the game </div>
			<Nav />
			<form onSubmit={e =>{
				e.preventDefault()
				dispatch(createGame(input.value))
				input.value = ''
			}}>
				<input ref = {node => {
					input = node
				}} />
				<button type = 'submit'>
					Create Game
				</button>
			</form> 

		</div>
	</MuiThemeProvider>
)}
CreateGame = connect()(CreateGame);

export default CreateGame
