import React from 'react';

const RoomListItem = ({room, onRoomSelect}) => {
  return (
    <li onClick={() => onRoomSelect(room)} className="col-sm-offset-5 col-sm-6 list-group-item-info">{room.roomname}
      <ul className="list-group list-unstyled">
        {room.players.map(player => { return (<li className="list-group-item list-group-item-action">{player}</li>) })}
      </ul>
    </li>
  );
};

export default RoomListItem;