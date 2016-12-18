const intitialState = {
	audioFilePath: '',
	userAnswer: '',
	question: '',
	options: [],
	difficulty: '',
	scoreObj: [],
	result: false,
	gameID:'',
	gameHost:'',
	number: 1,
	joinAsHost: false,
	isFetching: false,
	text: 'Speech to text goes here',
	games: []
}


const trivia = (state = intitialState, action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			return {
				...state,
				gameID: action.gameID,
				gameHost: action.gameHost,
				joinAsHost: true,
				isFetching: false
			}
		case 'JOIN_GAME':
			return {
				...state,
				gameID: action.gameID,
				gameHost: action.gameHost,
				isFetching: false
			}
		case 'SEND_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'POST_ANSWER':
			return {
				...state,
				userAnswer: action.answer
			}
		case 'GET_QUESTION':
			return {
				...state,
				question: action.question,
				options: action.options,
				difficulty: action.difficulty,
				number: action.number,
			}
		case 'GET_GAME_INFO':
			return {
				...state,
				maxQuestions: action.maxQuestions,
			}
		case 'UPDATE_SCORE':
			return {
				...state,
				scoreObj: action.scoreObj
			}
		case 'RECORD_VOICE':
			return state
		case 'SKIP_QUESTION':
			return state
		case 'SPEECH_TO_TEXT':
		   console.log("Reducer for speech to text");
		   console.log(action.text);
		   return {
		   	...state,
		   	text: action.text
		   }
	  case 'GET_ONGOING_GAMES':
	     console.log(" Get ongoing games in reducer");
	     console.log(action.games);
	     var array = action.games.map(function(element) {
          return element;
	     });
	     return {
       	 ...state,
       	 games: array
       }

		default:
			return state
	}
}
export default trivia
