import React from 'react'
// import Styles from '../components/Styles'
import FontIcon from 'material-ui/FontIcon'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import { connect } from 'react-redux'
import { getQuestion, postAnswer, activateMic, speechToText } from '../actions'
import Question from '../components/Question'
import {red500} from 'material-ui/styles/colors';

const micIcon = <FontIcon className="material-icons" color={red500}>mic</FontIcon>
const micNoneIcon = <FontIcon className="material-icons">mic_none</FontIcon>


let streamSpeech = () => {
    // activate mic state
    store.dispatch(activateMic(true))
    let that = this;

    let final_transcript = '';
    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US'

      recognition.onstart = function() {
        console.log('Recognition started');
      }

      recognition.onresult = function(event) {
        var interim_transcript = '';

        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            // store.dispatch(doneRecording(speech))
            socket.emit('answer', final_transcript, correct => {
              console.log(final_transcript + ' was correct? ' + correct);
            });
            recognition.stop();
            store.dispatch(activateMic(false))
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        store.dispatch(speechToText(interim_transcript));
      };
      recognition.onerror = function(event) {
        console.log('Recognition error: ' + event);

      }
      recognition.onend = function() {
        console.log('Recognition ended');


      }

      recognition.start();
    }

    // fetch('/watsontoken')
    // .then(function(response) {
    //     return response.text();
    //   }).then(function (token) {
    //     var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
    //       token: token,
    //       continuous: false, // false = automatically stop transcription the first time a pause is detected
    //       extractResults: true// outputElement: '#output' // CSS selector or DOM Element
    //     });
    //     stream.on('error', function(err) {
    //       console.log(err);
    //     });
    //     stream.on('data', function(data) {
    //       console.log(data.alternatives[0]);
    //       let speech = data.alternatives[0].transcript;
    //       console.log(speech);
    //       store.dispatch(speechToText(speech))
    //       if (data.alternatives[0].confidence !== undefined) {
    //         // deactivate mic state
    //         store.dispatch(activateMic(false))
    //         console.log("final value is ", speech)
    //         store.dispatch(speechToText(speech))
    //         socket.emit('answer', speech, correct => {
    //           console.log(speech + ' was correct? ' + correct);
    //         });
    //         // store.dispatch(doneRecording(speech))
    //       }
    //     })
    // });
  }


let Tools = ({ dispatch, micState }) => {
  return (
    <BottomNavigation>
      { micState ? (
          <BottomNavigationItem
            label="Record"
            icon={micIcon}
            onTouchTap={() => {
              console.log('Record button clicked :)')
              streamSpeech()
              }
            }
          />
        )
        : (
          <BottomNavigationItem
            label="Record"
            icon={micNoneIcon}
            onTouchTap={() => {
              console.log('Record button clicked :)')
              streamSpeech()
              }
            }
          />
        )
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