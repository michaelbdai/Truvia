import React from 'react'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Styles from './Styles'


const Question = () => (
	<div>
    <Paper style={Styles.questionContainer} zDepth={1} >
      <div style={Styles.questionHeader}>
        <p>Question 1 of 15</p>
      </div>
      <Divider />
      <div style={Styles.questionBody}>
        Who is the smartest person in HR 51?
      </div>
    </Paper>

  </div>
)

export default Question