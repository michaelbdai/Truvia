import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {capitalize} from 'lodash';

import Styles from './Styles'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const Option = ({option}) => (
  <li>{option}</li>
)

const Question = ({question, options, difficulty, questionNum, maxQuestions}) => (
  <Paper style={Styles.questionContainer} zDepth={1} >
    {question && <div style={Styles.questionHeader}>
      {capitalize(difficulty)} question, {questionNum} of {maxQuestions}
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

export default Question
