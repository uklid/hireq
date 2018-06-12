import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background-color: #954590;
  color: #fff;
  height: ${props => props.height ? props.height : '35px'};
  width: ${props => props.width ? props.width : '120px'};
  margin-top: ${props => props.marginTop ? props.marginTop : '2px'};
  cursor: pointer;
  border: none;
  border-radius: 20px !important;

  &:hover {
    background-color: rgb(149, 69, 144, 0.7);
  }
`

export default ({ name, onClick, height, width, children, marginTop }) => (
  <Button
    onClick={onClick}
    height={height}
    width={width}
    marginTop={marginTop}
  >
    {children}
  </Button>
)