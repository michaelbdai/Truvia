import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Styles from './Styles'

const Scoreboard = () => (
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
      <TableRow>
        <TableRowColumn>1</TableRowColumn>
        <TableRowColumn>Susan Hong</TableRowColumn>
        <TableRowColumn>10</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>2</TableRowColumn>
        <TableRowColumn>Bing Dai</TableRowColumn>
        <TableRowColumn>6</TableRowColumn>
      </TableRow>
    </TableBody>
    </Table>
  </Paper>
);

export default Scoreboard

 // <Paper style={Styles.scoreboardContainer} zDepth={1} >
 //      <List>
 //        <Subheader>Score Board</Subheader>
 //        <ListItem
 //          primaryText="Brendan Lim"
 //        />
 //      </List>
 //    </Paper>
