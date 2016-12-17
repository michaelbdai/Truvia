import { connect } from 'react-redux'
import Answer from '../components/Answer'


const mapStateToProps = (state) => {
  return {
   text: state.text
 }
}

const mapDispatchToProps = () => ({

})


const ShowAnswer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer)

export default ShowAnswer
