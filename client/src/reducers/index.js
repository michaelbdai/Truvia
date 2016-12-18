const intitialState = {
	audioFilePath: '',
	userAnswer: '',
	question: '',
	options: [],
	difficulty: '',
	text: 'Speech to text goes here',	
	scoreObj: [],
	roundWinner: '',
	roundDialogShow: false,
	result: false,
	gameID:'',
	gameHost:'',
	number: 1,
	joinAsHost: false,
	isFetching: false,
	isRecording: false,
	gameStarted: false,
	userName:'',
}


const trivia = (state = intitialState, action) => {
	switch (action.type) {
		case 'CREATE_GAME':
			return {
				...state,
				gameID: action.gameID,
				gameHost: action.gameHost,
				userName: action.userName,
				joinAsHost: true,
				isFetching: false,
			}
		case 'JOIN_GAME':
			console.log('joinGame in reducer')
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

		default:
			return state
	}
}
export default trivia
