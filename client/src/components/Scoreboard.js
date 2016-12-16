import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Styles from './Styles'

const Scoreboard = ({userObj}) => (
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
      Object.keys(userObj).map((name, index)=>(
      <TableRow key={index}>
        <TableRowColumn>{index}</TableRowColumn>
        <TableRowColumn>{name}</TableRowColumn>
        <TableRowColumn>{userObj[name]}</TableRowColumn>
      </TableRow>

      ))
    }
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
