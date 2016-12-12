import React, { Component } from 'react'
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'
import Trivia from './trivia.jsx'
import ScoreBoard from  './ScoreBoard.jsx'
import RoomView from  './RoomView.jsx'
import exampleData from './exampleData.js'


class App extends React.Component {

  constructor(props) {
    super(props);

    const answers = exampleData[0].incorrect_answers;
    answers.push(exampleData[0].correct_answer);

    this.state = {
      question: exampleData[0].question,
      correct_answer: exampleData[0].correct_answer,
      answers: answers,
      answerSelected: false,
      roomName: null,
      rooms: [
        'Default',
        'Lobby',
      ]
    };
  }



 createRoomHandler(event) {
   // TODO: figure out why event.keyCode is undefined
   if (event.key === 'Enter') {
     let room = event.target.value;

     this.setState({
       roomName: room
     });

     // TODO: make an ajax POST request with the value of the text box;
    //  $.ajax({
    //    url:'http://localhost:8080/rooms',
    //    method: 'POST',
    //    data: room
    //  });
   }
 }

 answerListEntryClickHandler (event, id) {
   // TODO: do some sweet css tricks on the chosen answer
   // make an ajax post request for the answer
   if (!this.state.answerSelected) {
     this.setState({
       answerSelected: true
     });
     event.target.style.color = 'red';
     //  $.ajax({
     //    url:'http://localhost:8080/question',
     //    method: 'POST',
     //    data: this.state.answers[id]
     //  });
   }
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
                <Trivia question={this.state.question} answers={this.state.answers} answerListEntryClickHandler={this.answerListEntryClickHandler.bind(this)}/>
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
