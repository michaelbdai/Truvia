import { connect } from 'react-redux'
import Answer from '../components/Answer'


const mapStateToProps = (state) => ({
  userAnswer: state.userAnswer
})

const mapDispatchToProps = () => ({

})


ShowAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)

export default ShowAnswer