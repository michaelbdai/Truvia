import AnswerList from './AnswerList.jsx'
import exampleData from './exampleData.js'
import React, { Component } from 'react'

class Trivia extends React.Component {

  constructor(props) {
    super(props);

    const answers = exampleData[0].incorrect_answers;
    answers.push(exampleData[0].correct_answer);

    this.state = {
      room: props.room,
      question: exampleData[0].question,
      correct_answer: exampleData[0].correct_answer,
      answers: answers
    };
  }

  render() {
    return (
      <div>
        <h4 className="container" className='question background-shadow'>{this.state.question}</h4>
        <div className="answersContainer" >
          <AnswerList className="answers" answers={this.state.answers} />
        </div>
      </div>
    )
  }
}

export default Trivia
