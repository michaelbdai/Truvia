import React from 'react'
import Nav from './Nav'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Styles from './Styles'
import RaisedButton from 'material-ui/RaisedButton';
import { joinGame } from '../actions'

const GameOwners = ({dispatch, games, userName}) => (
  <div className='background stretch'>
    <Nav
      title='Available Games' />
    <div style={{paddingLeft: 10, paddingRight: 10}}>
      <Paper style={Styles.showGamesContainer} >
        <Table >
        <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
          <TableRow >
            <TableHeaderColumn>Owner</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
          games.map(({owner, rounds, roomID}) => (
            <TableRow key={roomID}>
              <TableRowColumn style={{width: '80%'}}>
                {owner}
              </TableRowColumn>
              <TableRowColumn>
                <RaisedButton
                  label='Join Room'
                  onClick={() => {
                    dispatch(joinGame(userName, roomID));
                  }}
                />
              </TableRowColumn>
            </TableRow>
          ))
        }


        </TableBody>
        </Table>
      </Paper>
    </div>
  </div>
);

export default GameOwners