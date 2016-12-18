import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'

import injectTapEventPlugin from 'react-tap-event-plugin'
import io from 'socket.io-client'

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
window.socket = io.connect('/trivia')
window.store = store
window.APP_NAME = 'Truevia'


import reducer from './reducers'
import App from './components/App'
import Game from './components/Game'
import { JoinGameView, JoinGameViewRoute } from './components/JoinGameView'
import CreateGame from './containers/CreateGame'
import HomePage from './containers/HomePage'
import Lobby from './components/Lobby'
import ShowGameOver from './containers/ShowGameOver'
import ShowGames from './containers/ShowGames'
import 'isomorphic-fetch';
require('es6-promise').polyfill();

// import auth from './auth'
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({
//       pathname: '/creategame',
//       state: { nextPathname: nextState.location.pathname }
//     })
//   }
// }


import Watson from './components/Watson';

import CustomThemeProvider from './components/CustomThemeProvider';
injectTapEventPlugin();

render((
  <CustomThemeProvider>
    <Provider store={store}>
  		<Router history={browserHistory}>
  			<Route path = '/' component = {HomePage}/>
  			<Route path = '/creategame' component = {CreateGame} />
  			<Route path = '/joingame' component = {JoinGameView} />
  			<Route path = '/joingame/:gameID' component = {JoinGameViewRoute} />
  			<Route path = '/game' component = {Game} />
        <Route path = '/gameover' component = {ShowGameOver} />
        <Route path = '/watson' component = {Watson} />
        <Route path = '/showGames' component = {ShowGames} />
        <Route path = '/lobby' component = {Lobby} />
  		</Router>
  	</Provider>
  </CustomThemeProvider>
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
