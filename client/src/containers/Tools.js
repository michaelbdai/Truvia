import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import { connect } from 'react-redux'
import { getQuestion, postAnswer, speechToText } from '../actions'
import Question from '../components/Question'

const micIcon = <FontIcon className="material-icons">mic</FontIcon>
const skipIcon = <FontIcon className="material-icons">help</FontIcon>
const submitIcon = <FontIcon className="material-icons">check</FontIcon>
// TODO: Somehow link (in html) to fetch icon does not work after implementing react-router. If no possible solution to connect link, try downloading https://material.io/icons/#ic_label_outline.
let speech ="hey";
let streamSpeech = () => {
    console.log("inside stream speech");
    let that = this;
    fetch('/watsontoken')
    .then(function(response) {
        console.log("inside response");
        return response.text();
      }).then(function (token) {
        var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
          token: token,
          continuous: false, // false = automatically stop transcription the first time a pause is detected
          extractResults: true// outputElement: '#output' // CSS selector or DOM Element
        });
        stream.on('error', function(err) {
          console.log("inside error");
          console.log(err);
        });
        
          stream.on('data', function(data) {
            console.log("data is ");
            console.log(data.alternatives[0]);
            speech = data.alternatives[0].transcript;
            console.log(speech);
            if (data.alternatives[0].confidence !== undefined) {
              console.log("final true");
              
              console.log("value is ", speech);
              store.dispatch(speechToText(speech))
            }
          })
      });
      // .then(function(value) {
      //  console.log("promisified value, ",value);
      // })
      // .catch(function(error) {
      //   console.log(error);
      // });
  }

let Tools = ({ dispatch }) => {
  return (
    <Paper zDepth={1}>
      <BottomNavigation>
        <BottomNavigationItem
          label="Record"
          icon={micIcon}
          onTouchTap={() => {
            console.log('Record button clicked :)'); // dispatches speechtoText action, 
            //store.dispatch(speechToText('te2st'))
            streamSpeech()
            // .then(function(speech) {
            //   console.log('ran')
            //   store.dispatch(speechToText('te2st'));
            // });
              
          
            
          }
        }
        />
        <BottomNavigationItem
          label="Skip"
          icon={skipIcon}
          onTouchTap={() => console.log('')}
        />
        <BottomNavigationItem
          label="Submit"
          icon={submitIcon}
          onTouchTap={() => {
            // this.select(2);
            console.log('submit button clicked')
            dispatch(postAnswer('yup'));
            // dispatch(getQuestion('How many students are in HR 51?'));
            }
          }
        />
      </BottomNavigation>
    </Paper>
  )
}
Tools = connect()(Tools)

export default Tools

// TODO: state change on bottom nav
// <BottomNavigation selectedIndex={this.state.selectedIndex}>
