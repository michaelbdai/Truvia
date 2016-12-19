import { connect } from 'react-redux'
import Scoreboard from '../components/Scoreboard'

const mapStateToProps = (state) => ({

  scoreObj: state.scoreObj,
  roundDialogShow: state.roundDialogShow,
  roundWinner: state.roundWinner,
  wrongDialogShow: state.wrongDialogShow,
})


let ShowScores = connect(
  mapStateToProps
)(Scoreboard)

export default ShowScores