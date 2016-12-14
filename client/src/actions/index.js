
export const postAnswer = () => ({
	type: 'POST_ANSWER'
})

export const getQuestion = () => ({
	type: 'GET_QUESTION'
})

export const recordVoice = (filepath) => {
	console.log(filepath);
	return {
		type: 'RECORD_VOICE',
		filepath
	}
};

export const skipQuestion = () => ({
	type: 'SKIP_QUESTION'
})
 
// let nextTodoId = 0
// export const addTodo = (text) => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text
// })

// export const setVisibilityFilter = (filter) => ({
//   type: 'SET_VISIBILITY_FILTER',
//   filter
// })

// export const toggleTodo = (id) => ({
//   type: 'TOGGLE_TODO',
//   id
// })