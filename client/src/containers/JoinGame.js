import React from 'react'
import { connect } from 'react-redux'
import { joinGame } from '../actions'
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Nav from '../components/Nav';

let JoinGame = ({ dispatch, gameID }) => {

  let txtField
	const onSubmit = e => {
		e && e.preventDefault()
    dispatch(joinGame(txtField.input.value, gameID))

		txtField.input.value = ''
	}
	return (
		<div className='stretch background'>
			<Nav
				title={`Welcome to ${APP_NAME}`} />
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
							label='Join Game'
							onTouchTap={onSubmit}/>
					</div>
				</form>
			</div>

		</div>
	)
}


JoinGame = connect()(JoinGame);

export default JoinGame


