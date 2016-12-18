import { connect } from 'react-redux'
import GameOwners from '../components/GameOwners'

const mapStateToProps = ({games, userName}) => {
  console.log("inside showgames.js");
  return {
   games,
   userName,
  }
}

const ShowGames = connect(
  mapStateToProps
)(GameOwners)

export default ShowGames
