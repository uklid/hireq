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

const ScoreWithPowerBar = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    color: rgba(0, 0, 0, 0.5);
    margin: 0px;    
    flex: 1
  }

  .powerBackground {
    flex: 3;
    width: 100%;
    height: 23px;
    background-color: #d3d3d3;
    margin-right: 30px;

    position: relative;
    display: flex;
    justify-content: space-between;

    .itemScore {
      font-size: 10px;
      margin-top: 23px;
      margin-right: -12px;
      margin-left: -2px;
    }
  }

  .scoreBar {
    background-color: #8fb209;
    position: absolute;
    height: 23px;
    z-index: 20;
  }

  .scoreLine {
    position: absolute;
    background-color: #055a31;
    height: 23px;
    width: 2px;
    z-index: 30;
  }
`

export default ({
  title,
  score,
  min,
  max,
  description,
  firstTitle,
  firstColor,
  secondColor,
  secondTitle
  }) => (
    <CardWrapper>
      <ScoreWithBage>
        <h4>{title}</h4>
        <div className="badgePadding">
          <BadgeItem style={{ fontSize: 10 }} color={firstColor}>{firstTitle}</BadgeItem>
          <BadgeItem style={{ fontSize: 10 }} color={secondColor}>{secondTitle}</BadgeItem>
        </div>
      </ScoreWithBage>
      <ScoreWithPowerBar>
        <h1>{score}</h1>
        <div className="powerBackground">
          <div style={{ marginLeft: `${score}%` }} className="scoreLine"></div>
          <div style={{ width: `${(max - min)}%`, marginLeft: `${min}%` }} className="scoreBar"></div>
          <div className="itemScore">0</div>
          <div className="itemScore">10</div>
          <div className="itemScore">20</div>
          <div className="itemScore">30</div>
          <div className="itemScore">40</div>
          <div className="itemScore">50</div>
          <div className="itemScore">60</div>
          <div className="itemScore">70</div>
          <div className="itemScore">80</div>
          <div className="itemScore">90</div>
          <div className="itemScore">100</div>
        </div>
      </ScoreWithPowerBar>
      <p style={{ fontSize: 12 , marginTop: 10 }}>{description}</p>
    </CardWrapper>
  )