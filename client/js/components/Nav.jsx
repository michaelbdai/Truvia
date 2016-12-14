import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
// TODO: Add Component dependancies

const Nav = () => (
  <div>
    <IndexLink activeClassName='active' to='/'>Header 1</IndexLink>&nbsp;
  </div>
)

export default Nav

// ==========================================
// Used to add to add params in endpoint
// ==========================================
// <IndexLink
// activeClassName='active'
// to={{
//   pathname: '/address/query',
//   query: { message: 'Hello from Route Query' }
// }}>Route Query</IndexLink>


// const Nav = () => (
//   <div>
//     <IndexLink activeClassName='active' to='/'>Header 1</IndexLink>&nbsp;
//     // Future heder links
//     // <IndexLink activeClassName='active' to='/route1'>Header 2</IndexLink>&nbsp;
//     // <IndexLink activeClassName='active' to='/route2'>Header 3</IndexLink>&nbsp
//     // <IndexLink activeClassName='active' to='/route3'>Header 4</IndexLink>&nbsp
//
//   </div>
// )
