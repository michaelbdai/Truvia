import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import reducer from './reducers'
import Index from './components/index.js'
import App from './components/App.js'
import Game from './components/Game.js'
import JoinGame from './components/JoinGame.js'
import CreateGame from './components/CreateGame.js'
import Login from './containers/Login'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Watson from './components/Watson';

injectTapEventPlugin();

const store = createStore(reducer)


render(
  (<Provider store={store}>
  	<div>
			<Router history={hashHistory}>
				<Route path = '/' component = {App}/>
				<Route path = 'creategame' component = {CreateGame} />
				<Route path = 'joingame' component = {JoinGame} />
				<Route path = 'game' component = {Game} />
        <Route path = 'watson' component = {Watson} />
			</Router>
		</div>
  </Provider>
  ), document.getElementById('app')
)

