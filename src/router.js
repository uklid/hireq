import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'
import App from './containers/App/App'
import asyncComponent from './helpers/AsyncFunc'
import QuizLayout from './containers/Quiz/QuizLayout'
import Loader from './LoadingComponent'
import BeforeQuiz from './containers/Quiz/BeforeQuiz'
import Privacy from './containers/Page/Privacy'
import TermOfService from './containers/Page/TermOfService'

const NotFound = (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <h1 style={{ color: 'red' }}>404 Not Found. Sorry</h1>
  </div>
)

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => isLoggedIn
      ? <Component {...props} />
      : <Redirect
        to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
      />}
  />
)
const PublicRoutes = (props) => {
  return (
    <ConnectedRouter history={props.history}>
      <div>
        {props.isLoading && <Loader />}
        <Switch>
          <Route
            exact
            path={'/candidate'}
            component={BeforeQuiz}
          />
          <Route
            exact
            path={'/quiz'}
            component={QuizLayout}
          />
          <Route
            path="/quiz-complete"
            component={asyncComponent(() => import('./containers/Quiz/QuizComplete'))}
          />
          <Route
            exact
            path={'/signin'}
            component={asyncComponent(() => import('./containers/Page/signin'))}
          />
          <Route
            exact
            path={'/term-of-privacy'}
            component={TermOfService}
          />
          <Route
            exact
            path={'/privacy'}
            component={Privacy}
          />
          <RestrictedRoute
            exact
            path={'/'}
            component={App}
            isLoggedIn={props.isLoggedIn}            
          />
          <RestrictedRoute
            path="/dashboard"
            component={App}
            isLoggedIn={props.isLoggedIn}
          />
          <Route render={() => NotFound} />
        </Switch>
      </div>
    </ConnectedRouter>
  )
}

const mapStateToProps = state => ({
  isLoggedIn: state.Auth.isLoggedIn,
  isLoading: state.Loading.loading,
})

export default connect(mapStateToProps, null)(PublicRoutes)

// export default connect(state => ({
//   isLoggedIn: state.Auth.get('idToken') !== null,
// }))(PublicRoutes)
