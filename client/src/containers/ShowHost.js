import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  gameHost: state.gameHost
})

let ShowHost = ({gameHost}) => (
	<div>Gamehost: {gameHost} </div>
)

ShowHost = connect(
  mapStateToProps
)(ShowHost)

export default ShowHost