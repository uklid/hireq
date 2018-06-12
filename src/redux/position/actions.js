export const updatePositionData = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_POSITIONS_DATA',
    data: data
  })
}

export const searchPosition = (data) => (dispatch, getState) => {
  dispatch({
    type: 'SEARCH_POSITION',
    data: data
  })
}

export const preCreatePosition = (data) => (dispatch, getState) => {
  dispatch({
    type: 'PREPRARE_CREATE',
    data: data
  })
}

export const updatePositionDetail = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_POSITION_DETAIL',
    data: data
  })
}

export const updateCreatedAllPosition = (data) => (dispatch, getState) => {
  dispatch({
    type: 'UPDATE_ALL_POSITION_CREATED',
    data: data
  })
}

export const updatePreEditData = (data) => (dispatch,getState) => {
  dispatch({
    type: 'UPDATE_PRE_EDIT_DATA',
    data: data
  })
}