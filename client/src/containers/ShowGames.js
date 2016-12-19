import { connect } from 'react-redux'
import GameOwners from '../components/GameOwners'

const mapStateToProps = ({games, userName}) => ({
 games,
 userName,
})

const ShowGames = connect(
  mapStateToProps
)(GameOwners)

export default ShowGames
