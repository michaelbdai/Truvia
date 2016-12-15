import React from 'react'
import Nav from './Nav'
import Scoreboard from './Scoreboard'
import Question from './Question'
import Answer from './Answer'
import Tools from '../containers/Tools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'





const Game = () => (
	<MuiThemeProvider>
    <div>
  		<Nav />
  		<Scoreboard />
  		<Question />
  		<Answer />
  		<Tools />
    </div>
  </MuiThemeProvider>

)

export default Game