import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Trivia from './trivia.jsx'
import ScoreBoard from  './ScoreBoard.jsx'
import RoomView from  './RoomView.jsx'


class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      roomName: null,
      rooms: [
        'Default',
        'Lobby',
      ]
    };
  }


 createRoomHandler(event) {
   // TODO: figure out why event.keyCode is undefined

   if (event.keyCode === 13) {
     let room = event.target.value;

     this.setState({
       roomName: room
     });

     // TODO: make an ajax POST request with the value of the text box;
   }
 }

 answerListEntryClickHandler (id) {
   // TODO: do some sweet css tricks on the chosen answer
   // make an ajax post request for the answer
 }

 roomListEntryClickHandler (id) {
   let room = this.state.rooms[id];

   this.setState({
     roomName: room
   });
 }



  render() {
    return (
      <div>
        <div className="header background-shadow">
          <div className="logo">truevia!</div>
          <div className="room">Room: {this.state.roomName}</div>
        </div>
        <div className="container">
        {function() {
          if (this.state.roomName === null) {
            return(
              <RoomView rooms={this.state.rooms} createRoomHandler={this.createRoomHandler.bind(this)} roomListEntryClickHandler={this.roomListEntryClickHandler.bind(this)} />
            )
          } else {
            return (
              <div>
                <Trivia />
                <ScoreBoard />
              </div>
            )
          }
        }.call(this)}
        </div>
      </div>
    )
  }

}

export default App
