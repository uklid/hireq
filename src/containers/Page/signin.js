import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Input from '../../components/uielements/input'
import Button from '../../components/uielements/button'
import styled from 'styled-components'
import { LoginCheck } from '../../redux/auth/actions'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'

const SignInWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(${require('../../image/signin-image.jpg')}) no-repeat;
  background-size: cover;
`

const WhiteWrapper = styled.div`
  width: 489px;
  height: 500px;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 767px) {
    width: 90%;
    height: 375px;
  }
`

const SignInBlock = styled.div`
  @media only screen and (max-width: 767px) {
    width: 85%;
  }
`

class SignIn extends Component {

  handleLogin = async () => {
    const { LoginCheck, Loading, LoadingSuccess } = this.props
    Loading()
    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    await LoginCheck(email, password)
    LoadingSuccess()
  }
  render() {
    const { errorMessage } = this.props
    // Check if alreay signin redirect to dashboard page
    if (localStorage.getItem('loginToken')) {
      return <Redirect to="/dashboard" />
    }
    return (
      <SignInWrapper>
        <WhiteWrapper>
          <SignInBlock>
            <h1 style={{ textAlign: 'center', marginBottom: 30 }}>LOGIN</h1>
            <p style={{ color: 'red', width: 422 }}> {errorMessage && errorMessage} </p>
            <Input id="username" style={{ marginBottom: 15 }} size="large" placeholder="Username" />
            <Input type="password" id="password" style={{ marginBottom: 23 }} size="large" placeholder="Password" />
            <Button
              style={{
                width: '100%', backgroundColor: '#954590', color: '#fff',
                borderRadius: 20
              }}
              onClick={this.handleLogin}
            >
              Login
            </Button>
          </SignInBlock>
        </WhiteWrapper>
      </SignInWrapper>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: state.Auth.errorMessage
})

export default connect(mapStateToProps, { LoginCheck, Loading, LoadingSuccess })(SignIn)
