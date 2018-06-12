export const updateCandidateId = (id) => (dispatch, getState) => {

  dispatch({
    type: 'UPDATE_CANDIDATE_ID',
    data: id
  })
}