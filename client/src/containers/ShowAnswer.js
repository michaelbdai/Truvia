import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Styles from '../components/Styles'

const mapStateToProps = (state) => ({
  userAnswer: state.userAnswer
})

const ShowAnswer = ({userAnswer}) => (
  <Paper style={Styles.answerContainer} >
    {userAnswer}
  </Paper>
)

ShowAnswer = connect(
  mapStateToProps
)(ShowAnswer)

export default ShowAnswer