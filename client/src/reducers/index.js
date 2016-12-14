const intitialState = {
	audioFilePath: 'record/answer.wav',
	userAnswer: '',
	question: '',
	userObj: {},
	result: false
}
const postAnswer = (state = intitialState, action) => {
	//send state.userAnswer to server
	//get result from server
	//all users' result and 

}

// const updateScoreboard = (state, action) => {
// 	//
// } 

const getQuestion = (state = intitialState, action) => {
	//get request for next question
	//change initialState
}

const trivia = (state = intitialState, action) => {
	switch (action.type) {
		case 'POST_ANSWER':
			//send state.userAnswer to SERVER
			//get result from server
			//all users' result
			//update: state.userObj and state.result  
			return state
		case 'GET_QUESTION':
			//get request for next question
			//update state.question per respond
			return state
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