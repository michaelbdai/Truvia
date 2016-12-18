import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import Styles from './Styles'
import Dialog from 'material-ui/Dialog'

const Scoreboard = ({scoreObj, roundDialogShow, roundWinner}) => (
  <div>
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
      scoreObj
        .sort((a, b) => {a.score - b.score})
        .map((userObj, index) => (
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
  <Dialog
    title="Result for last round: "
    modal={false}
    open={roundDialogShow}
  >
  {roundWinner} won last round!
  </Dialog>
  </div>
);

export default Scoreboard

//.sort((a,b) => {a.score - b.score})