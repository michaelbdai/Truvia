import React from 'react'
import Paper from 'material-ui/Paper'
import Styles from './Styles'
import { connect } from 'react-redux'


const Answer = ({text}) => (

	<Paper style={Styles.answerContainer} >
   {text}
  </Paper>
)

export default Answer