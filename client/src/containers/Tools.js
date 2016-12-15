import React from 'react'
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const micIcon = <FontIcon className="material-icons">mic</FontIcon>;
const skipIcon = <FontIcon className="material-icons">help</FontIcon>;
const submitIcon = <FontIcon className="material-icons">check</FontIcon>;


export default class Tools extends React.Component {
  // contructor() {
  //   super(props);
  //   this.state = {
  //     selectedIndex: 0,
  //   }
  // };

  // select (index) {
  //   this.setState({selectedIndex: index});
  // }

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Record"
            icon={micIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Skip"
            icon={skipIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Submit"
            icon={submitIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    )
  }
}
// TODO: state change on bottom nav
// <BottomNavigation selectedIndex={this.state.selectedIndex}>


// <div>
//   <div> Record </div>
//   <div> Submit </div>
//   <div> Skip </div>
// </div>
