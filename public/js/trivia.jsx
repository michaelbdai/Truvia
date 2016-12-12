import AnswerList from './AnswerList.jsx'
import exampleData from './exampleData.js'
import React, { Component } from 'react'

class Trivia extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      question: props.question,
      answers: props.answers,
      answerListEntryClickHandler: props.answerListEntryClickHandler
    };
  }

  render() {
    return (
      <div>
        <h4 className="container" className='question background-shadow'>{this.state.question}</h4>
        <div className="answersContainer" >
          <AnswerList className="answers" answers={this.state.answers} answerListEntryClickHandler={this.state.answerListEntryClickHandler}/>
        </div>
      </div>
    )
  }
}

export default Trivia
