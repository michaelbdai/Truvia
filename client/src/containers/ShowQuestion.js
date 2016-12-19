import { connect } from 'react-redux'
import Question from '../components/Question'

const mapStateToProps = (state) => {
  return {
    question: state.question,
    options: state.options,
    difficulty: state.difficulty,
    questionNum: state.questionNum,
    maxQuestions: state.maxQuestions,
  }
}

const ShowQuestion = connect(
  mapStateToProps
)(Question)

export default ShowQuestion
