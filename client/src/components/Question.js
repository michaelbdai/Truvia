import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Styles from './Styles'
import { connect } from 'react-redux'

const Question = ({question='Who is the smartest person in HR 51?'}) => (
  <Paper style={Styles.questionContainer} zDepth={1} >
    <div style={Styles.questionHeader}>
      <p>Question 1 of 15</p>
    </div>
    <Divider />
    <div style={Styles.questionBody}>
      <div>{console.log('in Question'+question)}</div>
      <div>{question}</div>
    </div>
  </Paper>
)
Question.propTypes = {
  question: PropTypes.string.isRequired
}

export default Question