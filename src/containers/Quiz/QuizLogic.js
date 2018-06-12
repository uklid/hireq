import React from 'react'
import styled from 'styled-components'

const QuizChoice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  img {
    border: 1px solid #eee;
    margin-top: 10px;
  }
  img:hover {
    cursor: pointer;
    border: 1px solid red;
  }
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;

  .quiz-image {
    width: px;
    height: 400px;
  }
  .quiz-answer-image {
    width: 120px;
    height: 120px;
  }
  @media only screen and (max-width: 767px) {
		.quiz-image {
      width: 100%;
      height: 100%;
    }
    .quiz-answer-image {
      width: 50%;
      height: 100px;
    }
	}
`

class QuizLogic extends React.Component {
  render() {
    const { imageData, quizImage, onClick } = this.props
    return (
      <Wrapper>
        <img className="quiz-image" src={quizImage} alt="quiz"/>
        <h3>เลือกรูปภาพที่คิดว่าถูกต้องที่สุด</h3>
        <QuizChoice id="logicQuizChoice">
          {
            imageData.map((data, index) => {
              return <img
                className="quiz-answer-image"
                onClick={onClick}
                key={index}
                data-answer={data.c}
                src={require(`../../image/QuizImage/Answer/${data.img}`)}
                alt={`answer${index}`}
              />
            })
          }
        </QuizChoice>
      </Wrapper>
    )
  }
}

export default QuizLogic
