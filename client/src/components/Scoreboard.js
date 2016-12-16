import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Styles from './Styles'

const Scoreboard = ({scoreObj}) => (
  <Paper style={Styles.scoreboardContainer} >
    <Table >
    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
      <TableRow >
        <TableHeaderColumn>Ranking</TableHeaderColumn>
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Score</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {
      scoreObj.map((userObj, index)=>(
        <TableRow key={index}>
          <TableRowColumn>{index}</TableRowColumn>
          <TableRowColumn>{userObj.name}</TableRowColumn>
          <TableRowColumn>{userObj.score}</TableRowColumn>
        </TableRow>
      ))
    }
    </TableBody>
    </Table>
  </Paper>
);

export default Scoreboard