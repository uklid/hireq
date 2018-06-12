const initialState = {
  allCandidatesData: [],
  deleteId: '',
  positionId: '',
  toggleDialog: false,
  candidateCheckId: [],
  allChecked: false
}

const Candidates = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_ALL_CANDIDATES':
      return {
        ...state,
        allCandidatesData: action.data
      }
    case 'UPDATE_DELETE_ID':
      return {
        ...state,
        deleteId: action.data.deleteId,
        positionId: action.data.positionId
      }
    case 'UPDATE_TOGGLE_DIALOG':
      return {
        ...state,
        toggleDialog: action.data
      }
    case 'UPDATE_CANDIDATE_CHECK_ID':
      return {
        ...state,
        candidateCheckId: [...state.candidateCheckId, action.data]
      }
    case 'UPDATE_ALL_CHECKED':
      return {
        ...state,
        allChecked: action.data
      }
    case 'UPDATE_UNCHECK_ID':
      return {
        ...state,
        candidateCheckId: [...action.data]
      }
    default:
      return state
  }
}

export default Candidates