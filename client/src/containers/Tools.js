import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import Paper from 'material-ui/Paper'

import { connect } from 'react-redux'
import { getQuestion, postAnswer, speechToText } from '../actions'
import Question from '../components/Question'
import {red500} from 'material-ui/styles/colors';

const micIcon = <FontIcon className="material-icons">mic</FontIcon>
const redMicIcon = <FontIcon className="material-icons" color={red500}>mic</FontIcon>
const skipIcon = <FontIcon className="material-icons">help</FontIcon>
const submitIcon = <FontIcon className="material-icons">check</FontIcon>

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
            console.log("final value is ", speech);
            store.dispatch(speechToText(speech))
          }
        })
    });
  }

let Tools = ({ dispatch, isRecording}) => {
  return (
    <Paper zDepth={1}>
      <BottomNavigation>
        <BottomNavigationItem
          label="Record"
          icon={isRecording? redMicIcon : micIcon}
          onTouchTap={() => {
            console.log('Record button clicked :)')
            streamSpeech()
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
            console.log('submit button clicked')
            dispatch(postAnswer('yup'));
            }
          }
        />
      </BottomNavigation>
    </Paper>
  )
}

Tools = connect(mapStateToProps)(Tools)

export default Tools
