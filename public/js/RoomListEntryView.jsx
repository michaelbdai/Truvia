const RoomListEntryView = ({room, id, roomListEntryClickHandler}) => (
  <div onClick={(e) => roomListEntryClickHandler(id)} className="answer background-shadow">{room}</div>
);

export default RoomListEntryView
