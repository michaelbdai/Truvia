import React from 'react'
import AppBar from 'material-ui/AppBar'







const Nav = (props) => (
	<div>
    {/* TODO: Decide what functionalities would be inside app bar */}
    <AppBar
    title={props.title}
		style={props.style}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />


  </div>
)

export default Nav

/*
Todo: load <StatusBar /> if needed
iconElementRight={<ShowHost gameID={gameID}/>}

*/
