import { connect } from 'react-redux'
import Scoreboard from '../components/Scoreboard'


const mapStateToProps = (state) => ({
  userObj: state.userObj
})

const mapDispatchToProps = () => ({

})



let ShowScores = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard)

export default ShowScores