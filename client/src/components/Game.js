import React from 'react'
import Nav from './Nav'
import ShowScores from '../containers/ShowScores'
// import Question from './Question'
import VisibleQuestion from '../containers/VisibleQuestion'
import Answer from './Answer'
import Tools from '../containers/Tools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const Game = () => (
	<MuiThemeProvider>
    <div>
  		<Nav />
  		<ShowScores />
  		<VisibleQuestion />
  		<Answer />
  		<Tools />
    </div>
  </MuiThemeProvider>

)

export default Game