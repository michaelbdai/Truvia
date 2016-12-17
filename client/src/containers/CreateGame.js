import React from 'react'
import { connect } from 'react-redux'
import { createGame } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Nav from '../components/Nav'
import { hashHistory } from 'react-router'

let CreateGame = ({ dispatch }) => {
	let input
	const onSubmit = e => {
		e.preventDefault()
		dispatch(createGame(input.value))
		input.value = ''
	}
	return (
		<MuiThemeProvider>
			<div className='stretch background'>
				<Nav
					title={`Welcome to ${APP_NAME}`}
					style={{backgroundColor: '#8BC34A'}}/>
				<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%'
					}}>
					<div style={{marginTop: -200}}>
						<FontIcon
							className="material-icons"
							style={{fontSize: 288, color: 'rgb(71, 83, 67)'}}>school</FontIcon>
					</div>
					<form onSubmit={onSubmit}>
					<TextField
						hintText='Your Name'
						underlineStyle={{borderColor: 'white'}}
						hintStyle={{color: '#88a666'}}
						ref={node => input = node}/>
					<div style={{marginTop: 20}}>
						<RaisedButton
							label='Create Game'
							onTouchTap={onSubmit}/>
					</div>

					</form>
				</div>

			</div>
		</MuiThemeProvider>
	)
}
CreateGame = connect()(CreateGame);

export default CreateGame
