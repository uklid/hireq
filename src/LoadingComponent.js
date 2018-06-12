import React from 'react'
import styled from 'styled-components'

const LoaderWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Loader = styled.div`

  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #954590;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default () => (
  <LoaderWrapper>
    <Loader />
  </LoaderWrapper>
)