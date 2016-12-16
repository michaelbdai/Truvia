import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Styles from './Styles'
import { connect } from 'react-redux'

const Option = ({option}) => (
  <div>{option}</div>
)

const Question = ({question, options, difficulty}) => (
  <Paper style={Styles.questionContainer} zDepth={1} >
    <div style={Styles.questionHeader}>
      <p>Question 1 of 15</p>
      <p>{difficulty}</p>
    </div>
    <Divider />
    <div style={Styles.questionBody}>
      <div>{question}</div>
      { options.map((option, idx)=>
          <Option key={idx} option={option}/>
        )}
    </div>
  </Paper>
)

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  difficulty: PropTypes.string.isRequired
}

export default Question