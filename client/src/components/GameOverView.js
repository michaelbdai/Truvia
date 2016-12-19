import React from 'react'
import Nav from './Nav'

import Styles from './Styles'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon'
import {lightgreen900} from 'material-ui/styles/colors';

const GameOverView = ({ scoreObj, userName }) => {
  let maxScore = 0
  let maxScoreUser = ''
  scoreObj.forEach((user)=>{
    console.log(user);
    if(user.score >= maxScore){
      maxScore = user.score
      maxScoreUser = user.name
    }
  });
  let winner = maxScoreUser === userName

  return (
    <div className='background stretch'>
      <Nav
        title={`${APP_NAME}`} />
        <div style={{
          paddingLeft: 10,
          paddingRight: 10
        }}>
          <Paper style={Styles.gameOverContainer} zDepth={1}>
            <div style={Styles.gameOverHeader}>
              Game Over
            </div>
            <Divider />
            <div style={Styles.gameOverBody}>
            {
              winner ? (
                <div>
                  <FontIcon className="material-icons" color="lightgreen900" style={{fontSize: '50px'}}>mood</FontIcon>
                  <div>You WIN!</div>
                </div>
              ) : (
                <div>
                  <FontIcon className="material-icons" color="lightgreen900" style={{fontSize: '50px'}}>mood_bad</FontIcon>
                  <div>You LOSE!</div>
                </div>
              )
            }
            </div>
          </Paper>
        </div>
    </div>
  )
}

export default GameOverView
