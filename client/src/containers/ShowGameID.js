import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  gameID: state.gameID
})

const mapDispatchToProps = () => ({

})

let ShowGameID = ({gameID}) => (

	<div>GameID: {gameID} </div>

)

ShowGameID = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowGameID)

export default ShowGameID