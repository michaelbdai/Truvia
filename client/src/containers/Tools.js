import React from 'react'
import { connect } from 'react-redux'
import { getQuestion, postAnswer, activateMic, speechToText, timedShowWrongDialog } from '../actions'

import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import {red500} from 'material-ui/styles/colors';
const micIcon = <FontIcon className="material-icons" color={red500}>mic</FontIcon>
const micNoneIcon = <FontIcon className="material-icons">mic_none</FontIcon>

// Speech-to-text
const streamSpeech = () => {
  // activate the mic button
  store.dispatch(activateMic(true))
  let final_transcript = ''
  if (!('webkitSpeechRecognition' in window)) {
    upgrade()
  } else {
    console.log('recognition')
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US'
    recognition.onresult = function(event) {
      console.log('result')
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript
          socket.emit('answer', final_transcript, correct => {
            console.log(final_transcript + ' was correct? ' + correct);
            !correct && store.dispatch(timedShowWrongDialog())
          })
          recognition.stop()
          store.dispatch(activateMic(false))
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      store.dispatch(speechToText(final_transcript || interim_transcript))
    }
  }
  recognition.start();
}


let Tools = ({ dispatch, micState }) => {
  return (
    <BottomNavigation style={{
        position: 'absolute',
        width: '100vw',
        bottom: 0,
        left: 0,
        height: '8%'
      }}>
      { micState ? (
          <BottomNavigationItem
            label="Record"
            icon={micIcon}
            onTouchTap={() => {
              console.log('Record button clicked :)')
              streamSpeech()
              }
            }
          />)
        : (<BottomNavigationItem
            label="Record"
            icon={micNoneIcon}
            onTouchTap={() => {
              console.log('Record button clicked :)')
              streamSpeech()
              }
            }
        />)
      }
    </BottomNavigation>
  )
}

const mapStateToProps = (state) => ({
  micState: state.micState
})

Tools = connect(
  mapStateToProps
)(Tools)

export default Tools
