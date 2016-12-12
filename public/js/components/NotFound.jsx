import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
// TODO: Add Component dependancies

const NotFound = (props) => (
  <h2>404 Error: this page is not found</h2>
)

export default NotFound

// Use for a statefull component
// class NotFound extends Component {
// constructor(props) {
//   super(props);
//   this.state = {
//     date: new Date()
//   };
// }
//   render () {
//     return (
//
//     )
//   }
// }
