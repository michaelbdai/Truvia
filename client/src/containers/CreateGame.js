import React from 'react'
import { connect } from 'react-redux'
import { createGame, ongoingGames } from '../actions'

import Nav from '../components/Nav';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class CreateGame extends React.Component {
	constructor(props) {
		super(props);
		this.dispatch = props.dispatch;
		this.state = {
			rounds: 5
		}
	}
	render() {
		let txtField
		const onSubmit = e => {
			e && e.preventDefault()
			this.dispatch(createGame(txtField.input.value, this.state.rounds))
			txtField.input.value = ''
		}

		return (
			<div className='stretch background'>
				<Nav
					title='Create Game' />
				<div style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					}}>
					<Paper zDepth={1}
						style={{padding:20}}>
						<TextField
							hintText='Enter anything'
							floatingLabelText='Your name'
							ref={node => txtField = node}/>
						<br />
						<form onSubmit={onSubmit}>
							<SelectField
			          floatingLabelText="Rounds"
			          value={this.state.rounds}
			          onChange={(e,i,rounds) => this.setState({rounds})}
			        >
			          <MenuItem value={3} primaryText="3" />
			          <MenuItem value={5} primaryText="5" />
			          <MenuItem value={10} primaryText="10" />
			          <MenuItem value={20} primaryText="20" />
			          <MenuItem value={25} primaryText="25" />
			        </SelectField>
							<div style={{marginTop: 20}}>
							 <RaisedButton
									label='Create Game'
									onTouchTap={onSubmit}/>
							</div>
						</form>
					</Paper>
				</div>
			</div>
		)
	}
}

CreateGame = connect()(CreateGame);

export default CreateGame
