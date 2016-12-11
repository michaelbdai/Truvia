import React, { Component } from 'react'

class CreateRoomView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      createRoomHandler: props.createRoomHandler
    };
  }

  render() {
    return (
      <input onChange={(e) => this.state.createRoomHandler(e)} className="answer background-shadow" type="text" placeholder="Create a room" />
    )
  }

}

export default CreateRoomView
