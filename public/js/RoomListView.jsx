import RoomListEntryView from './RoomListEntryView.jsx'
import CreateRoomView from './CreateRoomView.jsx'

const RoomListView = ({rooms, createRoomHandler, roomListEntryClickHandler}) => (
  <div>
    {rooms.map((room, i) =>
      <RoomListEntryView roomListEntryClickHandler={roomListEntryClickHandler} room={room} key={i} id={i} />
    )}
    <CreateRoomView createRoomHandler={createRoomHandler} />
  </div>
);

export default RoomListView
