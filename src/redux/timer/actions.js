import moment from 'moment'

export const DECREASE = 'DECREASE'
export const UPDATE_TIME = 'UPDATE_TIME'

export const decreaseTime = () => (dispatch, getState) => {
  let timeNow = getState().Time.time
  dispatch({
    type: DECREASE,
    data: timeNow - 1000
  })
}

export const updateTimeFromApi = (startTime) => (dispatch, getState) => {
  const now = moment(new Date()).format("HH:mm:ss")
  const then = moment(startTime).format("HH:mm:ss")

  const differentTime = moment
    .utc(moment(now, "HH:mm:ss")
      .diff(moment(then, "HH:mm:ss")))
    .format("HH:mm:ss")

  const hour = ((moment(differentTime, "HH:mm:ss").format("HH") * 60) * 60) * 1000 //change hour to millisecond
  const minute = ((moment(differentTime, "HH:mm:ss").format("mm") * 60)) * 1000 // change minute to millisecond
  const changeToMilliSecond = hour + minute
  const realTime = getState().Time.time - changeToMilliSecond
  dispatch({
    type: UPDATE_TIME,
    data: realTime
  })
}