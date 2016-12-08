import AnswerList from './AnswerList.jsx'
import exampleData from './exampleData.js'
import React, { Component } from 'react'

class Trivia extends React.Component {

  constructor(props) {
    super(props);

    const answers = exampleData[0].incorrect_answers;
    answers.push(exampleData[0].correct_answer);

    this.state = {
      question: exampleData[0].question,
      correct_answer: exampleData[0].correct_answer,
      answers: answers
    };
  }

  render() {
    return(
      <div>
        <div className='question'>{this.state.question}</div>
        <AnswerList answers={this.state.answers} />
      </div>
    )
  }
}

export default Trivia
