import React from 'react'
import Nav from './Nav'
import Styles from './Styles'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon'
import {lightgreen900} from 'material-ui/styles/colors';

// const happyIcon = <FontIcon className="material-icons">mood</FontIcon>
// const sadIcon = <FontIcon className="material-icons">mood bad</FontIcon>


const GameOverView = () => (
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
            <FontIcon className="material-icons" color="lightgreen900" style={{fontSize: '50px'}}>mood</FontIcon>
            <div>You WIN!</div>
          </div>
        </Paper>

      </div>
  </div>
)

export default GameOverView

// import React from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Paper from 'material-ui/Paper';
// import RaisedButton from 'material-ui/RaisedButton';

// export default class GameOverView extends React.Component {
//   render() {
//     return (
//       <MuiThemeProvider>
//         <div>
//           <Paper style={{padding: 20, marginBottom: 20, height: 300, width: 400}} zDepth={1}>

//           </Paper>
//           <RaisedButton label='Exit' secondary={true}></RaisedButton>
//         </div>
//       </MuiThemeProvider>
//       );
//   }
// }