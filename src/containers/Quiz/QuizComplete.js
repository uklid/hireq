import React from 'react'
import styled from 'styled-components'

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
  width: 400px;
  height: 200px;
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

export default () => (
  <SignInWrapper>
    <WhiteWrapper>
      <SignInBlock>
        <h1 style={{ textAlign: 'center', marginBottom: 30 }}>
          DONE
        </h1>
      </SignInBlock>
    </WhiteWrapper>
  </SignInWrapper>
)