export const updateCurrentPage = (currentPage) => (dispatch, getState) => {
  const pageData = (currentPage - 1) * 10
  dispatch({
    type: 'UPDATE_PAGE',
    data: pageData
  })
}
