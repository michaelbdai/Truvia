import { connect } from 'react-redux'
import Scoreboard from '../components/Scoreboard'

const mapStateToProps = (state) => ({
  scoreObj: state.scoreObj
})

let ShowScores = connect(
  mapStateToProps
)(Scoreboard)

export default ShowScores