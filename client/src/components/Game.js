import React from 'react'
import Nav from './Nav'
import ShowScores from '../containers/ShowScores'
// import Question from './Question'
import ShowQuestion from '../containers/ShowQuestion'
import Answer from './Answer'
import Tools from '../containers/Tools'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';



const Game = () => (
	<MuiThemeProvider>
    <div className='background stretch'>
  		<Nav
				title={`${APP_NAME}`}
				style={{backgroundColor: '#8BC34A'}} />
			<div style={{
				paddingLeft: 10,
				paddingRight: 10
				}}>
	  		<ShowScores />
	  		<ShowQuestion />
	  		<Answer />
	  		<Tools />
			</div>
    </div>
  </MuiThemeProvider>

)

export default Game
