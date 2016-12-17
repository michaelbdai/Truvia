import { connect } from 'react-redux'
import Scoreboard from '../components/Scoreboard'


const mapStateToProps = (state) => ({
  userObj: state.userObj
})


let ShowScores = connect(
  mapStateToProps
)(Scoreboard)

export default ShowScores