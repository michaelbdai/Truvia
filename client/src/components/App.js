import React from 'react'
import Nav from './Nav'
import Scoreboard from './Scoreboard'
import Question from './Question'
import Answer from './Answer'
import Tools from '../containers/Tools'
import { Link } from 'react-router'


const App = () => (
	<div>
		app
		<Link to='/creategame'> creategame </Link>
	</div>


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
