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
	let txtField
	const onSubmit = e => {
		e && e.preventDefault()
		console.log('dfgdf', txtField.input.value);
		dispatch(createGame(txtField.input.value))
		txtField.input.value = ''
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
							hintText='Enter anything'
							floatingLabelText='Your name'

							ref={node => txtField = node}/>
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
