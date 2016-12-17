import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

export default class Watson extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      translatedSpeech: 'Speech will go here after record'
    }
  }

  streamSpeech() {
    let that = this;
    fetch('/watsontoken')
    // fetch('/api/token', {method: 'POST'})
      .then(function(response) {
        return response.text();
      }).then(function (token) {

        var stream = WatsonSpeech.SpeechToText.recognizeMicrophone({
          token: token,
          continuous: false, // false = automatically stop transcription the first time a pause is detected
          extractResults: true// outputElement: '#output' // CSS selector or DOM Element
        });

        stream.on('error', function(err) {
          console.log(err);
        });

        stream.on('data', function(data) {
          that.setState({translatedSpeech: data.alternatives[0].transcript})
          console.log(data);
        });
        // what is this for????
        setTimeout(() => console.log('stream is ', stream), 10000);

      }).catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Paper style={{padding: 20, marginBottom: 20, height: 300, width: 400}} zDepth={1}> 
            {this.state.translatedSpeech}
          </Paper>
          <RaisedButton label='Record' secondary={true} onClick={this.streamSpeech.bind(this)}></RaisedButton>
        </div>
      </MuiThemeProvider>
      );
  }
}


    
