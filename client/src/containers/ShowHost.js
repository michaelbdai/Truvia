import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  gameHost: state.gameHost
})

const mapDispatchToProps = () => ({

})

let ShowHost = ({gameHost}) => (

	<div>Gamehost: {gameHost} </div>

)

ShowHost = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowHost)

export default ShowHost