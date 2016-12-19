import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'

import 'isomorphic-fetch';
require('es6-promise').polyfill();
import io from 'socket.io-client'

import reducer from './reducers'
const store = createStore(reducer, applyMiddleware(thunkMiddleware))
window.socket = io.connect('/trivia')
window.store = store

import HomePage from './containers/HomePage'
import CreateGame from './containers/CreateGame'
import ShowGames from './containers/ShowGames'
import { JoinGameView, JoinGameViewRoute } from './components/JoinGameView'
import Lobby from './components/Lobby'
import Game from './components/Game'
import ShowGameOver from './containers/ShowGameOver'

import CustomThemeProvider from './components/CustomThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

window.APP_NAME = 'Truevia'

render((
  <CustomThemeProvider>
    <Provider store={store}>
  		<Router history={browserHistory}>
  			<Route path='/' component={HomePage}/>
  			<Route path='/creategame' component={CreateGame}/>
  			<Route path='/joingame' component={JoinGameView}/>
  			<Route path='/joingame/:gameID' component={JoinGameViewRoute}/>
  			<Route path='/game' component={Game}/>
        <Route path='/gameover' component={ShowGameOver}/>
        <Route path='/showGames' component={ShowGames}/>
        <Route path='/lobby' component={Lobby}/>
  		</Router>
  	</Provider>
  </CustomThemeProvider>
  ), document.getElementById('app')
);