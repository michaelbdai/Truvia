import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';
import Signup from './Signup.jsx';
import RoomList from './RoomList.jsx';
import Global from 'react-global';


class Rooms extends Component {
  constructor(props) {
    super(props);
    // rooms = [{ roomname: 'lobby': players: ['John', 'Jill'] }] 
    this.state = {
      date: new Date(),
      // username: this.props.player.username,
      username: 'Alexa',
      // rooms: [],
      rooms: [
      {
        roomname: 'lobby', players: ['Josh', 'Will']
      },
      {
        roomname: 'newroom', players: ['Nick', 'Craig']
      }],
      newRoomname: '',
      selectedRoom: null,
      currentPage: 'rooms'
    };
  };

  componentWillMount() {
    // let player=this.props.sendPlayerInfo();
    // console.log(player);
  }

  handleRoomnameInput(event) {
    console.log('roomname-input', this.state.newRoomname);
    this.setState({ newRoomname: event.target.value });
  };

  joinRoom() {
    console.log(window);
    if (this.state.selectedRoom !== null) {
      console.log(this.state.selectedRoom);
      let currentRooms = this.state.rooms;
      let selectedRoom = this.state.selectedRoom;
      currentRooms.forEach((room, i) => {
        if (room.roomname === selectedRoom.roomname) {
          currentRooms[i].players.push(this.state.username);
        }
      });
      this.setState({ rooms: currentRooms });
    }
  };

  createRoom() {
    console.log('roomname', this.state.newRoomname);
    let newRoom = {};
    newRoom.roomname = this.state.newRoomname;
    newRoom.players = [this.state.username];
    console.log('newRoom', newRoom);
    let currentRooms = this.state.rooms;
    currentRooms.push(newRoom);
    this.setState({ rooms: currentRooms });
    console.log('rooms', this.state.rooms);
  };

  signOutPlayer() {
    console.log('sign out user', this.state.username);
  };

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group">
          <label htmlFor="inputEmail3" className="col-sm-2 control-label">Room</label>
          <div className="col-sm-5">
            <input type="text" className="form-control" id="inputEmail3" placeholder="New Room" onChange={this.handleRoomnameInput.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary" onClick={this.createRoom.bind(this)}>Create new room</button>
          </div>
        </div>
        <RoomList 
          onRoomSelect={ selectedRoom => this.setState({selectedRoom}) }
          rooms={this.state.rooms} 
        />
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default" onClick={this.joinRoom.bind(this)}>Join selected room</button>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-danger" onClick={this.signOutPlayer.bind(this)}>Quit</button>
          </div>
        </div>
      </form>
    );
  };
};

export default Rooms;
