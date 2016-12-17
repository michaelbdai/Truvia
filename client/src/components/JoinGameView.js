import React from 'react'
import { connect } from 'react-redux'
import JoinGame from '../containers/JoinGame'
import Nav from './Nav'

export const JoinGameViewRoute = (props) => (
  <JoinGameView gameID={props.params.gameID} />
)

export const JoinGameView = ({gameID}) => (
  <JoinGame gameID = {gameID}/>
)