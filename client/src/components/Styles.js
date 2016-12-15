const Styles = {
  scoreboardContainer: {
    height: 200,
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    display: 'inline-block',
  },
  questionContainer : {
    height: 300,
    width: '100%',
    margin: 0,
    textAlign: 'center',
    display: 'inline-block',
  },
  questionHeader : {
    height: 50,
    width: '100%',
    fontSize: '20px',
  },
  questionBody: {
    fontSize: '17px',
    padding: '20px 20px',
    textAlign: 'left',
  },
  answerContainer: {
    height: 100,
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    display: 'inline-block',
    padding: '20px 20px',
  }
};

export default Styles;

// Question: Don't know why it doesn't work when 'export const Styles = {..}'