import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  gameID: state.gameID
  gameHost: state.gameHost
  joinAsHost: state.joinAsHost
  playerCount: Object.keys(state.userObj).length
})

let StatusBar = ({gameID, gameHost, joinAsHost, playerCount}) => (
  <div>
    <spam>Join as {joinAsHost? 'host' : 'guest'}/ </spam>
    <spam>{playerCount} playrs joined/ </spam>
    <spam>GameLinke: /joingame/{gameID} </spam>
  </div>
)     


StatusBar = connect(
  mapStateToProps
)(StatusBar)

export default StatusBar
