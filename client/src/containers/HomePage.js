import React from 'react'
import { connect } from 'react-redux'
import { createGame, ongoingGames } from '../actions'
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Nav from '../components/Nav';
import { browserHistory } from 'react-router'

let HomePage = ({ dispatch }) => {
	let txtField
	const navigateCreate = e => {
		e && e.preventDefault()
    browserHistory.push('/creategame');

		// dispatch(createGame(txtField.input.value))
		// console.log('TODO')
		txtField.input.value = ''
	};
	// when i join the room, i should change the games state to the new state. and go to the new page
	const onJoin = () => {
		console.log("inside onJoin");
		console.log(txtField.input.value);
    dispatch(ongoingGames(txtField.input.value));
    txtField.input.value = ''
	};

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
				<form onSubmit={onJoin}>
					<TextField
						hintText='Enter anything'
						floatingLabelText='Your name'

						ref={node => txtField = node}/>
					<div style={{marginTop: 20}}>
					 <RaisedButton
							label='Join Game'
							onTouchTap={onJoin}/>
					</div>
				</form>
				<RaisedButton
					label='Create Game'
					onTouchTap={navigateCreate}
					style={{
						position: 'absolute',
						bottom: 40,
						right: 40,
					}}/>
			</div>

		</div>
	)
}
HomePage = connect()(HomePage);

export default HomePage
