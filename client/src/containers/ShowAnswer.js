import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Styles from '../components/Styles'
import Answer from '../components/Answer'

const mapStateToProps = (state) => {
  console.log("inside show answer");
  console.log(state);
  return {
   text: state.text
 }
}

// const Answer = ({userAnswer}) => (
//   <Paper style={Styles.answerContainer} >
//     {userAnswer}
//   </Paper>
// )


const ShowAnswer = connect(
  mapStateToProps
)(Answer)


export default ShowAnswer