import React from 'react'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import FontIcon from 'material-ui/FontIcon'
import FlatButton from 'material-ui/FlatButton'
import Login from '../containers/Login'
import Signup from '../containers/Signup'
import AppBar from 'material-ui/AppBar'
import Styles from './Styles'


// const Nav = () => (

//   <AppBar >
//     <ToolbarGroup>
//       <ToolbarTitle text="Truvia" style={Styles.toolbarTitle} />
//     </ToolbarGroup>
//     <FontIcon className="muidocs-icon-custom-sort" />

//     <ToolbarGroup>
//       <Signup />
//       <FlatButton
//         icon={<FontIcon className="material-icons">account_circle</FontIcon>}
//         label="Signup"
//         style={Styles.userButton} />
//     </ToolbarGroup>
//     <ToolbarGroup>
//       <Login />
//       <FlatButton
//         icon={<FontIcon className="material-icons">account_circle</FontIcon>}
//         label="Login"
//         style={Styles.userButton} />
//     </ToolbarGroup>    
//   </AppBar>

// )


const Nav = () => (
	<div>
    {/* TODO: Decide what functionalities would be inside app bar */}
    <AppBar
    title="Trivia"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
  </div>
)

export default Nav