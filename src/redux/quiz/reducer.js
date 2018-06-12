const initialState = {
  quizDataCog: [],
  quizDataPer: [],
  quizDataSS: [],
  quizDataWP: [],
  allQuizDone: 0,
  currentQuiz: '',
  quizPath: 1,
  quizPercent: 1
}

const Quiz = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_QUIZ_PERCENT':
      return {
        ...state,
        quizPercent: action.data
      }
    case 'UPDATE_QUIZ_PATH':
      return {
        ...state,
        quizPath: action.data
      }
    case 'UPDATE_CURRENT_QUIZ':
      return {
        ...state,
        currentQuiz: action.data
      }
    case 'UPDATE_COG':
      return {
        ...state,
        quizDataCog: [...action.data]
      }
    case 'UPDATE_PER':
      return {
        ...state,
        quizDataPer: [...action.data]
      }
    case 'UPDATE_SS':
      return {
        ...state,
        quizDataSS: [...action.data]
      }
    case 'UPDATE_WP':
      return {
        ...state,
        quizDataWP: [...action.data]
      }
    case 'UPDATE_ALL_QUIZ_DONE':
      return {
        ...state,
        allQuizDone: action.data
      }
    default:
      return state
  }
}

export default Quiz