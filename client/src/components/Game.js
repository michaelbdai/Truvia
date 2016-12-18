import React from 'react'
import Nav from './Nav'
import ShowScores from '../containers/ShowScores'
// import Question from './Question'
import ShowQuestion from '../containers/ShowQuestion'
import ShowAnswer from '../containers/ShowAnswer'
import Tools from '../containers/Tools'


const Game = () => (
  <div className='background stretch'>
		<Nav
			title={`${APP_NAME}`} />
		<div style={{
			paddingLeft: 10,
			paddingRight: 10
			}}>
  		<ShowScores />
  		<ShowQuestion />
  		<ShowAnswer />
  		<Tools />
		</div>
  </div>
)

export default Game
