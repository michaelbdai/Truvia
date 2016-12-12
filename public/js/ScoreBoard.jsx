import ScoreList from './ScoreList.jsx'
import exampleData from './exampleData.js'
import React, { Component } from 'react'

class ScoreBoard extends React.Component {

  constructor(props) {
    super(props);

    const scores = [
      {
        rank: 1,
        name: 'Fred',
        score: '100',
        total: '850'
      },
      {
        rank: 2,
        name: 'George',
        score: '25',
        total: '350'
      }
    ];

    this.state = {
      room: props.room,
      scores: scores
    };
  }

  render() {
    return(
      <div>
        <h4 className="container" className='question background-shadow'>Scoreboard</h4>
        <div className="answersContainer" >
          <ScoreList className="answers" scores={this.state.scores} />
        </div>
      </div>
    )
  }
}

export default ScoreBoard
