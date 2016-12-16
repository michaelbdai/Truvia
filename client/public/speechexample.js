document.querySelector('#button').onclick = function () {

  // fetch('/api/speech-to-text/token')
  fetch('http://localhost:4000/api/token', {method: 'POST'})
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
        console.log(data);
      });

      setTimeout(() => console.log('stream is ', stream), 10000);

    }).catch(function(error) {
      console.log(error);
    });
};