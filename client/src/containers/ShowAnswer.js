import { connect } from 'react-redux'
import Answer from '../components/Answer'

const mapStateToProps = (state) => {
  return {
   text: state.text
 }
}

const ShowAnswer = connect(
  mapStateToProps
)(Answer)

export default ShowAnswer
