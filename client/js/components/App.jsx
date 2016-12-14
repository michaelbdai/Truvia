import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router'
import Container from './Container.jsx'
import Signin from './Signin.jsx'
import Signup from './Signup.jsx'
import Trivia from './Trivia.jsx'
import NotFound from './NotFound.jsx'
import Rooms from './Rooms.jsx'
import uuid from 'uuid'



class App extends Component {
  verifyUser (formData) {
    // TODO: Enter user verification
    return true
  }
  render () {
    return (
      <Router history={hashHistory} >
        <Route path='/' component={Container} >
          <IndexRoute component={Rooms} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/rooms' component={Rooms} />
          <Route path='/trivia' component={Trivia} />
          <Route path='*' component={NotFound} />
        </Route>
      </Router>
    )
  }
}

//
// <Router history={hashHistory} >
// // Uncomment to use browserHistory TODO: set up routes on server side
// // <Router history={browserHistory}>
//   // Home route
//   <Route path='/' component={Container} >
//     // onEnter={function(nextState, transition) {
//     //   reutrn if (!/*USER_IS_AUTHED*/true) { transition.to('signin'); }
//     // }}>
//     // Signin Page route (default route)
//     <IndexRoute component={Signin} />
//     // Signin Page route
//     <Route path='/signin' component={Signin} />
//     // Signup Page route
//     <Route path='/signup' component={Signup} />
//     // Rooms Page route
//     <Route path='/rooms' component={Rooms} />
//     // Trivia Page route
//     <Route path='/trivia' component={Trivia} />
//       // Future sub routes of Trivia
//       // <IndexRoute component={Comp1} />
//       // <Route path='route2' component={Comp2} />
//       // <Route path='route3' component={Comp3} />
//
//     <Route path='*' component={NotFound} />
//   </Route>
// </Router>





export default App
