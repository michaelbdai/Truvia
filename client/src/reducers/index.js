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
		default:
			return state
	}
}
export default trivia

