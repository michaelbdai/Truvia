import React from 'react'
import ShowHost from '../containers/ShowHost'
import ShowGameID from '../containers/ShowGameID'
import AppBar from 'material-ui/AppBar'







const Nav = () => (
	<div>
    {/* TODO: Decide what functionalities would be inside app bar */}
    <AppBar
    title="Trivia"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <ShowGameID />
    <ShowHost />
  </div>
)

export default Nav

/*iconElementRight={<ShowHost gameID={gameID}/>}*/