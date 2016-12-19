import { connect } from 'react-redux'
import {startGame} from '../actions'

import Styles from '../components/Styles'
import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

const mapStateToProps = (state) => ({
  gameHost: state.gameHost,
  joinAsHost: state.joinAsHost,
  userList: state.scoreObj.map(obj => obj.name),
  gameUrl: window.location.origin + '/joingame/' + state.gameID,
})

let ShowStatus = ({userList, joinAsHost, gameUrl, dispatch, gameHost}) => {
  const onSubmit = e => {
    dispatch(startGame)
  }
  return (
    <div>
      <Toolbar>
        <ToolbarTitle text = {
          'Join as ' +
          (joinAsHost? 'host' : 'guest') +
           ' @ ' +
           gameUrl
         } />
      </Toolbar>
      <Paper style={Styles.scoreboardContainer} >
        <Table >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow >
            <TableHeaderColumn>Player</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {
          userList
            .map((userName, index) => (
            <TableRow key={index}>
              <TableRowColumn>{userName}</TableRowColumn>
            </TableRow>
          ))
        }
        </TableBody>
        </Table>
      </Paper>
        { joinAsHost ?
          (<div style={{marginTop: 20}}>
            <RaisedButton
              label='Start Game'
              onTouchTap={onSubmit}/>
          </div> )
          : (<div>
            Welcome to the game, please wait for Host({gameHost}) to start the game
          </div>)
        }
    </div>
)}

ShowStatus = connect(
  mapStateToProps
)(ShowStatus)

export default ShowStatus