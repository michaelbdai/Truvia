import React, { Component } from 'react';
import RoomListItem from './RoomListItem.jsx';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  };

  handleToggle(index) {
    this.setState({ activeIndex: index })
  };

  render() {
    let active = this.state.activeIndex;
    const roomItems = this.props.rooms.map((room, index) => {
      return (
        <RoomListItem 
        active={index === active}
        onToggle={this.handleToggle.bind(this, index)}
        onRoomSelect={this.props.onRoomSelect}
        key={room.roomname} 
        room={room} />
      );
    });

    return (
      <ul className="col-sm-5 list-group list-unstyled">
        {roomItems}
      </ul>
    );
  };
};

export default RoomList;