import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Styles from './Styles'
import RaisedButton from 'material-ui/RaisedButton';

const GameOwners = ({games}) => (
  <Paper style={Styles.showGamesContainer} >
    <Table >
    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
      <TableRow >
        <TableHeaderColumn>Owner</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {
      games
        .map((name) => (
        <TableRow key={name}>
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn><RaisedButton
              label='Join Room'
              /></TableRowColumn>
        </TableRow>
      ))
    }
  
        
    </TableBody>
    </Table>
  </Paper>
);

export default GameOwners