import firebase from 'firebase'
import { push } from 'react-router-redux'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGOUT = 'LOGOUT'

export const LoginCheck = (email, password) => async dispatch => {
  try {
    // const req = await firebase.auth().signInWithEmailAndPassword('test@hireq.io', 'hireq01')
    const req = await firebase.auth().signInWithEmailAndPassword(email, password)    
    const getIdToken = await firebase.auth().currentUser.getIdToken()
    await localStorage.setItem('loginToken', req.uid)
    await localStorage.setItem('headerToken', getIdToken)

    await dispatch({
      type: LOGIN_SUCCESS,
      authToken: req.uid,
      headerToken: getIdToken
    })
    await dispatch(push('/dashboard'))
  } catch (err) {
    console.log(err.message)
    dispatch({
      type: 'LOGIN_FAIL',
      data: err.message
    })
  }

}

export const AuthCheck = async (dispatch, getState) => {

}

export const SignOut = () => async dispatch => {

  await localStorage.removeItem('loginToken')
  dispatch({
    type: LOGOUT,
  })
}