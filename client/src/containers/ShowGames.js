import { connect } from 'react-redux'
import GameOwners from '../components/GameOwners'

const mapStateToProps = (state) => {
  console.log("inside showgames.js");
  console.log(state);
  return {
   games: state.games
  }
}

const ShowGames = connect(
  mapStateToProps
)(GameOwners)

export default ShowGames
