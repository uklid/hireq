import React from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div`
  width: 100%;
  border-radius: 1px;
  background-color: #fff;
  padding: 14px;

  h2 {
    margin: 0;
    color: rgba(0, 0, 0, 0.5);
  }
`

const ScoreWithBage = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items:center;

  .badgePadding {
    display: flex;
    justify-content: space-around;
    width: 100px;
  }
`

const BadgeItem = styled.div`
  height: 16px;
  width: 40px;
  padding: 1px;
  color: white;
  border-radius: 3px;
  text-align:center;
  background-color: ${({ color }) => color ? color : 'red'};
`

export default ({ 
  title,
  score,
  firstColor,
  secondColor,
  firstTitle,
  secondTitle,
  description 
}) => (
  <CardWrapper>
    <h4>{title}</h4>
    <ScoreWithBage>
      <h2>{score}</h2>
      <div className="badgePadding">
        <BadgeItem style={{ fontSize: 10 }} color={firstColor}>{firstTitle}</BadgeItem>
        <BadgeItem style={{ fontSize: 10 }} color={secondColor}>{secondTitle}</BadgeItem>
      </div>
    </ScoreWithBage>
    <p style={{ fontSize: 12 }}>{description}</p>
  </CardWrapper>
)