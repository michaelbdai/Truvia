import React from 'react'
import StatusBar from '../containers/StatusBar'
import AppBar from 'material-ui/AppBar'







const Nav = () => (
	<div>
    {/* TODO: Decide what functionalities would be inside app bar */}
    <AppBar
    title="Trivia"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
    <StatusBar />
  </div>
)

export default Nav

/*iconElementRight={<ShowHost gameID={gameID}/>}*/