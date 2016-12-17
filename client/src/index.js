import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import injectTapEventPlugin from 'react-tap-event-plugin'

import reducer from './reducers'
import App from './components/App'
import Game from './components/Game'
import JoinGameView from './components/JoinGameView'
import CreateGame from './containers/CreateGame'
import Login from './containers/Login'
import Watson from './components/Watson'
import auth from './auth'

injectTapEventPlugin()

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/creategame',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

render((
  <Provider store={store}>
		<Router history={hashHistory}>
			<Route path = '/' component = {Game}/>
			<Route path = 'creategame' component = {CreateGame} />
			<Route path = 'joingame' component = {JoinGameView} />
			<Route path = 'joingame/:gameID' component = {JoinGameView} />
			<Route path = 'game' component = {Game} />
      <Route path = 'watson' component = {Watson} />
		</Router>
	</Provider>
  ), document.getElementById('app')
);
/*
      <Route path='game' component={Game} onEnter={requireAuth} />
      <Route path = '/' component = {Game} onEnter={requireAuth}/>      
*/

//////////
// import { createStore, applyMiddleware } from 'redux'
// import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
// import rootReducer from './reducers'

// const loggerMiddleware = createLogger()

// export default function configureStore(preloadedState) {
//   return createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(
//       thunkMiddleware,
//       loggerMiddleware
//     )
//   )
// }


