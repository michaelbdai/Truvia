import { connect } from 'react-redux'
import Question from '../components/Question'

const mapStateToProps = (state) => {
  console.log('in VisibleQuestion');
  console.log(state.question);
  return {
    question: state.question
  }

}


const VisibleQuestion = connect(
  mapStateToProps
)(Question)

export default VisibleQuestion
