const intitialState = {
	audioFilePath: '',
	userAnswer: '',
	question: '',
	options: [],
	difficulty: '',
	text: 'Speech to text goes here',	
	scoreObj: [],
	result: false,
	gameID:'',
	gameHost:'',
	joinAsHost: false,
	isFetching: false,
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
				difficulty: action.difficulty
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

		default:
			return state
	}
}
export default trivia

