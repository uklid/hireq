import { UPDATE_TIME, DECREASE } from './actions'

const initialState = { time: 7200000 }

const Time = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TIME:
      return {
        ...state,
        time: action.data
      }
    case DECREASE:
      return {
        ...state,
        time: action.data
      }
    default:
      return state
  }
}

export default Time