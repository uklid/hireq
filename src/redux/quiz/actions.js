

export const updateCurrentTest = (currentTest) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_CURRENT_QUIZ',
    data: currentTest
  })
}

export const updateCog = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_COG',
    data: data
  })
}

export const updatePer = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_PER',
    data: data
  })
}

export const updateSS = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_SS',
    data: data
  })
}

export const updateWP = (data) => dispatch => {
  dispatch({
    type: 'UPDATE_WP',
    data: data
  })
}

export const updateQuizPath = (data) => (dispatch, getState) => {
  const updateData = data ? data : getState().Quiz.quizPath + 1
  dispatch({
    type: 'UPDATE_QUIZ_PATH',
    data: updateData
  })
}

export const updateQuizPercent = () => (dispatch, getState) => {
  const cog = getState().Quiz.quizDataCog
  const per = getState().Quiz.quizDataPer
  const ss = getState().Quiz.quizDataSS
  const wp = getState().Quiz.quizDataWP

  const allQuizLength = cog.length + per.length + ss.length + wp.length

  const filterCogDone = Object.values(cog).filter((data) => data.a ? data : null).length
  const filterPerDone = Object.values(per).filter((data) => data.a ? data : null).length
  const filterSSDone = Object.values(ss).filter((data) => data.a ? data : null).length
  const filterWPDone = Object.values(wp).filter((data) => data.a ? data : null).length

  const allQuizDoneLength = filterCogDone + filterPerDone + filterSSDone + filterWPDone

  dispatch({
    type: 'UPDATE_ALL_QUIZ_DONE',
    data: getState().Quiz.allQuizDone + 1
  })

  const allDone = getState().Quiz.allQuizDone + allQuizDoneLength
  const calculatePercent = () => {
    const result = (allDone / allQuizLength) * 100
    return parseInt(result, 10)
  }
  dispatch({
    type: 'UPDATE_QUIZ_PERCENT',
    data: calculatePercent()
  })
}