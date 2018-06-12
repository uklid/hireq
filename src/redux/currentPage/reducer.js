const initialState = {
  currentPage: 0,
  lastPage: 10
}

const CurrentPage = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PAGE':
      return {
        ...state,
        currentPage: action.data,
        lastPage: action.data + 10
      }
    default:
      return state
  }
}

export default CurrentPage