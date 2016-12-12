import React, { Component } from 'react';
import classNames from 'classnames';


class RoomListItem extends Component {
  constructor(props) {
    super(props);
  }; 

  getClassNames() {
    if (this.props.active) {
      return classNames({
        "list-group-item-info": true
      });
    } else {
      return classNames({
        "list-group-item-warning": true
      });
    }
  };

  render() {
    return (
      <li onClick={() => {
        this.props.onRoomSelect(this.props.room);
        this.props.onToggle();
      }
    } className={"col-sm-offset-5 col-sm-6 " + this.getClassNames()}>{this.props.room.roomname}
        <ul className="list-group list-unstyled">
          {this.props.room.players.map(player => { return (<li className="list-group-item list-group-item-action">{player}</li>) })}
        </ul>
      </li>
    );
  };
};

export default RoomListItem;