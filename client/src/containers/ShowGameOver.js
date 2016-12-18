import { connect } from 'react-redux'
import GameOverView from '../components/GameOverView'

const mapStateToProps = (state) => {
  return {
    result: state.result
  }
}

const ShowGameOver = connect(
  mapStateToProps
)(GameOverView)

export default ShowGameOver
