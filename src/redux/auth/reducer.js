const checkIsLoggedIn = () => {
  const isSignin = localStorage.getItem('loginToken')
  if (isSignin) {
    return true
  }
  return false
}

const initState = {
  idToken: null,
  loading: false,
  isLoggedIn: checkIsLoggedIn(),
  authToken: '',
  headerToken: '',
  error_message: ''
}
const Auth = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        authToken: action.authToken,
        headerToken: action.headerToken
      }
    case 'LOGOUT':
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        authToken: ''
      }
    case 'LOGIN_FAIL':
      return {
        ...state,
        loading: false,
        errorMessage: action.data
      }
    default:
      return {
        ...state,
        loading: false
      }
  }
}

export default Auth