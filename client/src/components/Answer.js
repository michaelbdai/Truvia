import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Styles from './Styles'

const Answer = ({text}) => (
	<Paper style={Styles.answerContainer} >
   {text}
  </Paper>
)

export default Answer