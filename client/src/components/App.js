import React from 'react'
import Nav from './Nav'
import Scoreboard from './Scoreboard'
import Question from './Question'
import Answer from './Answer'
import Tools from '../containers/Tools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Link } from 'react-router'


const App = () => (
	<MuiThemeProvider>
		<div>
			app
		</div>
	</MuiThemeProvider>


// const App = () => (
// 	<MuiThemeProvider>
//     <div>
//   		<Nav />
//   		<Scoreboard />
//   		<Question />
//   		<Answer />
//   		<Tools />
//     </div>
//   </MuiThemeProvider>


)
			// <Nav />
export default App