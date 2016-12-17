import { connect } from 'react-redux'
import Answer from '../components/Answer'


const mapStateToProps = (state) => {
  console.log("inside show answer");
  console.log(state);
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