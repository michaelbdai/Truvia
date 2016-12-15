import React from 'react'
import Paper from 'material-ui/Paper';
import Styles from './Styles'

const Question = () => (
	<div>
    <Paper style={Styles.questionPaper} zDepth={2} >
      Question in here
    </Paper>

  </div>
)

export default Question


// style="color: rgba(0, 0, 0, 0.870588); background-color: rgb(255, 255, 255); transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; box-sizing: border-box; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); box-shadow: rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px; border-radius: 0px;"