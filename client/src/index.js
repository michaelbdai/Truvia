import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import reducer from './reducers'
import { hashHistory } from 'react-router'
import Index from './components/index.js'
import App from './components/App.js'
import Game from './components/Game.js'
import JoinGame from './components/JoinGame.js'
import CreateGame from './components/CreateGame.js'
import Login from './containers/Login'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(reducer)

render(
  (<Provider store={store}>
		<Router history={hashHistory}>
			<Route path = '/' component = {App}>
				<IndexRoute component={Index}/>
				<Route path = 'joingame' component = {JoinGame} />
				<Route path = 'game/:gameID' component = {Game} />
				<Route path = 'creategame' component = {CreateGame} />
			</Route>
		</Router>
  </Provider>
  ), document.getElementById('app')
)