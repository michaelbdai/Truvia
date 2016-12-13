import React from 'react';
import RoomListItem from './RoomListItem.jsx';


const RoomList = (props) => {
  const roomItems = props.rooms.map((room) => {
    return (
      <RoomListItem 
      onRoomSelect={props.onRoomSelect}
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

export default RoomList;