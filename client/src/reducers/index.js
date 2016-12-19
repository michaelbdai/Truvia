const intitialState = {
	// states related to start game
	isFetching: false,
	userName:'',
	joinAsHost: false,
	gameID:'',
	gameHost:'',
	rounds: 10,
	games: [],
	gameStarted: false,

	// states related to trivia question
	maxQuestions: 10,
	questionNum: 1,
	difficulty: '',
	question: '',
	options: [],

	// states related to voice recognition
	micState: false,
	text: 'Speech to text goes here',
	// userAnswer: '',

	// states related to instant score
	result: false,
	wrongDialogShow: false,

	// states related to overall score
	scoreObj: [],
	roundDialogShow: false,
	roundWinner: '',
}


const trivia = (state = intitialState, action) => {
	switch (action.type) {
		case 'SEND_REQUEST':
			return {
				...state,
				isFetching: true
			}
		case 'CREATE_GAME':
			return {
				...state,
				gameID: action.gameID,
				gameHost: action.gameHost,
				userName: action.userName,
				joinAsHost: true,
				isFetching: false,
			}
		case 'SET_ROUNDS':
			return {
				...state,
				rounds: action.rounds,
			}
		case 'JOIN_GAME':
			return {
				...state,
				gameID: action.gameID,
				gameHost: action.gameHost,
				userName: action.userName,
				isFetching: false,
			}
		case 'START_GAME':
			return {
				...state,
				gameStarted: true
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
				questionNum: action.questionNum,
				maxQuestions: action.maxQuestions,
			}
		case 'UPDATE_SCORE':
			return {
				...state,
				scoreObj: action.scoreObj
			}

	  case 'GET_ONGOING_GAMES':
	    return {
       	 ...state,
       	 games: action.games,
       	 userName: action.userName,
      }
		case 'UPDATE_ROUND_WINNER':
			return {
				...state,
				roundWinner: action.roundWinner
			}
		case 'SHOW_ROUND_DIALOG':
			return {
				...state,
				roundDialogShow: true
			}
		case 'HIDE_ROUND_DIALOG':
			return {
				...state,
				roundDialogShow: false
			}
		case 'SHOW_WRONG_DIALOG':
			return {
				...state,
				wrongDialogShow: true
			}
		case 'HIDE_WRONG_DIALOG':
			return {
				...state,
				wrongDialogShow: false
			}
		case 'ACTIVATE_MIC':
			return {
				...state,
				micState: action.state
			}
		case 'SPEECH_TO_TEXT':
		  return {
				...state,
				text: action.text
		  }
		default:
			return state
	}
}

export default trivia
