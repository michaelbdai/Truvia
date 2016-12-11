import RoomListView from './RoomListView.jsx'
import exampleData from './exampleData.js'
import React, { Component } from 'react'

const RoomView = ({createRoomHandler, rooms, roomListEntryClickHandler}) => (
      <div>
        <h4 className="container" className='question background-shadow'>Rooms</h4>
        <div className="answersContainer" >
          <RoomListView className="answers" rooms={rooms} createRoomHandler={createRoomHandler} roomListEntryClickHandler={roomListEntryClickHandler}  />
        </div>
      </div>
    )

export default RoomView
