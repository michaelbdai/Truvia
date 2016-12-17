import React from 'react'
import { connect } from 'react-redux'
import JoinGame from '../containers/JoinGame'
import Nav from './Nav'

export const JoinGameViewRoute = (props) => (
  <div>
    <JoinGameView gameID={props.params.gameID} />
    <div>{console.log(props)}</div>
  </div>
)

export const JoinGameView = ({gameID}) => (
    <JoinGame gameID = {gameID}/>
)