import React from 'react'
import Nav from './Nav'
import Styles from './Styles'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon'
import {lightgreen900} from 'material-ui/styles/colors';


// ## TODO: change props result -> scoreObj!!
const GameOverView = ({ result }) => (
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
            result ? (
              <div>
                <FontIcon className="material-icons" color="lightgreen900" style={{fontSize: '50px'}}>mood</FontIcon>
                <div>{console.log(result)}</div>
                <div>You WIN!</div>
              </div>
            ) : (
              <div>
                <FontIcon className="material-icons" color="lightgreen900" style={{fontSize: '50px'}}>mood_bad</FontIcon>
                <div>{console.log(result)}</div>
                <div>You LOSE!</div>
              </div>
            )
          }
          </div>
        </Paper>
      </div>
  </div>
)

export default GameOverView
