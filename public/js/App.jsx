import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Trivia from './trivia.jsx'

const App = () => (
  <div>
    <h1>Hello World!</h1>
    <Trivia />
  </div>
);

export default App
