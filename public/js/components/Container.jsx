import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
import Nav from './Nav.jsx'
// TODO: Add Component dependancies

const Container = (props) => (
  <div>
    <Nav />
    {props.children}
  </div>
)

export default Container
