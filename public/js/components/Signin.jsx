import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory, IndexLink } from 'react-router';
import Signup from './Signup.jsx';
import Rooms from './Rooms.jsx';
import uuid from 'uuid';
import { connect } from 'react-redux';
import Global from 'react-global';


class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      userid: uuid.v4(),
      username: '',
      password: '',
      newPlayer: false,
      currentPage: 'signin'
    };
  };

  handleCreateNewPlayer() {
    this.setState({newPlayer: true});
  };

  sendPlayerInfo() {
    let playerInfo = JSON.parse(JSON.stringify(this.state));
    return playerInfo;
  }

  handleSignInPlayer() {
    console.log('username', this.state.username, 'password', this.state.password, 'id', this.state.userid, 'newPlayer', this.state.newPlayer);
    this.props.history.push('/rooms');
  };

  handleUsernameInput(event) {
    this.setState({
      username: event.target.value
    });
  };

  handlePasswordInput(event) {
    this.setState({
      password: event.target.value
    });
  };

  render() {
    if (this.state.newPlayer === true) {
      return (<Signup />);
    } else {
      return (
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-2 control-label">Name</label>
            <div className="col-sm-5">
              <input type="name" className="form-control" id="inputEmail3" placeholder="Name" onChange={this.handleUsernameInput.bind(this)} required/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
            <div className="col-sm-5">
              <input type="password" className="form-control" id="inputPassword3" placeholder="Password" onChange={this.handlePasswordInput.bind(this)} required/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default" onClick={this.handleSignInPlayer.bind(this)}>Sign in</button>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary" onClick={this.handleCreateNewPlayer.bind(this)}>Create new player</button>
            </div>
          </div>
        </form>
      );
    }
  };
};

export default Signin;

// function mapStateToProps(state) {
//   return {
//     player: state
//   };
// };

// export default connect(mapStateToProps)(Signin);
