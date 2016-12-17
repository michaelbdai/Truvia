import React from 'react'
import { connect } from 'react-redux'
import JoinGame from '../containers/JoinGame'
import Nav from './Nav'


const JoinGameView = (props) => (
    <JoinGame gameID = {props.params.gameID}/>
)

export default JoinGameView
