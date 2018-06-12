export const Loading = () => dispatch => {
  dispatch({
    type: 'LOADING'
  })
}

export const LoadingSuccess = () => dispatch => {
  dispatch({
    type: 'LOADING_SUCCESS'
  })
}