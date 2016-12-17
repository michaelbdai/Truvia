import { connect } from 'react-redux'


const mapStateToProps = (state) => ({
  gameID: state.gameID
})

let ShowGameID = ({gameID}) => (

	<div>GameLink: /joingame/{gameID} </div>

)

ShowGameID = connect(
  mapStateToProps
)(ShowGameID)

export default ShowGameID