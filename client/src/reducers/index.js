const intitialState = {
	audioFilePath: 'record/answer.wav',
	userAnswer: '',
	question: '',
	options: [],
	difficulty: 'haha',
	scoreObj: [{name: 'test', score: 99}],
	result: false,
	gameID:'',
	gameHost:'',
	joinAsHost: false,
	isFetching: false
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
			//send state.userAnswer to SERVER
			//get result from server
			//all users' result
			//update: state.userObj and state.result
			return {
				...state,
				userAnswer: action.answer
			}
		case 'GET_QUESTION':
			//get request for next question
			//update state.question per respond
			console.log('reducer triggered')
			return {
				...state,
				question: action.question,
				options: action.options,
				difficulty: action.difficulty
			}
		case 'UPDATE_SCORE':
			console.log('score updated in reducer')
			return {
				...state,
				scoreObj: action.scoreObj
			}
		case 'RECORD_VOICE':
			//change voice file
			//post request to API with audioFilePath
			//get userAnswer -> update state.userAnswer
			return state
		case 'SKIP_QUESTION':
			//1. RECORD_VOICE - but, change state.userAnswer to empty str
			//2. POST_ANSWER - post empty state.userAnswer
			return state
		default:
			return state
	}
}
export default trivia

