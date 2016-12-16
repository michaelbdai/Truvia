import React from 'react'
import ShowHost from '../containers/ShowHost'
import AppBar from 'material-ui/AppBar'






const Nav = ({gameID}) => (
	<div>
    {/* TODO: Decide what functionalities would be inside app bar */}
    <AppBar
    title="Trivia"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <div>{gameID}</div>
  </div>
)

export default Nav

/*iconElementRight={<ShowHost gameID={gameID}/>}*/