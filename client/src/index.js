import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducers'
import Index from './components/index.js'
import App from './components/App.js'
import Game from './components/Game.js'
import JoinGame from './components/JoinGame.js'
import CreateGame from './containers/CreateGame.js'
import Login from './containers/Login'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const store = createStore(reducer, applyMiddleware(thunkMiddleware))


render(
	(<Provider store={store}>
		<Router history={hashHistory}>
			<Route path = '/' component = {App}/>
			<Route path = 'creategame' component = {CreateGame} />
			<Route path = 'joingame' component = {JoinGame} />
			<Route path = 'joingame/:gameID' component = {JoinGame} />
			<Route path = 'game' component = {Game} />
		</Router>	
	</Provider>
  ), document.getElementById('app')
)


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


