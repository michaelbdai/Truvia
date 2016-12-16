import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import { connect } from 'react-redux'
import { getQuestion, postAnswer } from '../actions'
import Question from '../components/Question'

const micIcon = <FontIcon className="material-icons">mic</FontIcon>
const skipIcon = <FontIcon className="material-icons">help</FontIcon>
const submitIcon = <FontIcon className="material-icons">check</FontIcon>
// TODO: Somehow link (in html) to fetch icon does not work after implementing react-router. If no possible solution to connect link, try downloading https://material.io/icons/#ic_label_outline.

let Tools = ({ dispatch }) => {
  return (
    <Paper zDepth={1}>
      <BottomNavigation>
        <BottomNavigationItem
          label="Record"
          icon={micIcon}
          onTouchTap={() => console.log('')}
        />
        <BottomNavigationItem
          label="Skip"
          icon={skipIcon}
          onTouchTap={() => console.log('')}
        />
        <BottomNavigationItem
          label="Submit"
          icon={submitIcon}
          onTouchTap={() => {
            // this.select(2);
            console.log('submit button clicked')
            dispatch(postAnswer('yup'));
            // dispatch(getQuestion('How many students are in HR 51?'));
            }
          }
        />
      </BottomNavigation>
    </Paper>
  )
}
Tools = connect()(Tools)

export default Tools

// TODO: state change on bottom nav
// <BottomNavigation selectedIndex={this.state.selectedIndex}>

