import React, { PropTypes } from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Styles from './Styles'
import { connect } from 'react-redux'
import {capitalize} from 'lodash';

const Option = ({option}) => (
  <li>{option}</li>
)

const Question = ({question, options, difficulty, number, maxQuestions}) => (
  <Paper style={Styles.questionContainer} zDepth={1} >
    {question && <div style={Styles.questionHeader}>
      {capitalize(difficulty)} question, {number} of {maxQuestions}
    </div>}
    <Divider />
    <div style={Styles.questionBody}>
      <div>{question}</div>
      <div style={{marginLeft: -40}}>
        <ul>
          { options.map((option, idx)=>
              <Option key={idx} option={option}/>
            )}
        </ul>
      </div>
    </div>
  </Paper>
)

Question.propTypes = {
  question: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  difficulty: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired
}

export default Question
