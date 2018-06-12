const initialState = {
  loading: false,
}

const Loading = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'LOADING_SUCCESS':
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default Loading