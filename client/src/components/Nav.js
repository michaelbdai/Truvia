import React from 'react'
import AppBar from 'material-ui/AppBar'

const Nav = (props) => (
	<div>
    <AppBar
    title={props.title}
		style={props.style}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  </div>
)

export default Nav