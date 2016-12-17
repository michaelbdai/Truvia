import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  gameID: state.gameID,
  gameHost: state.gameHost,
  joinAsHost: state.joinAsHost,
  UserList: state.scoreObj.map(obj => obj.name)
})

let StatusBar = ({gameID, gameHost, joinAsHost}) => (
  <div>
    <spam>Join as {joinAsHost? 'host' : 'guest'}/ </spam>
    <spam>GameLink: /joingame/{gameID} </spam>
  </div>
)     


StatusBar = connect(
  mapStateToProps
)(StatusBar)

export default StatusBar
