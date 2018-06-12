import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Axios from 'axios'
import { updateCurrentPage } from '../../redux/currentPage/actions'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import {
	updateQuizPercent,
	updateQuizPath,
	updateCurrentTest,
	updateCog,
	updatePer,
	updateSS,
	updateWP
} from '../../redux/quiz/actions'
import { baseUrl } from '../../libs/url/baseUrl'

const QuizWrapper = styled.div`
	position: relative;
	text-align: center;
	height: 75px;
	margin-top: 40px;
	width: 70%;

	&:first-child {
		margin-top: 0px;
	}

	@media only screen and (max-width: 767px) {
		width: 264px;
	}

	h4 {
		margin-top: 14px;
		margin-left: 15px;
		margin-bottom: 15px;
		font-size: 16px;
	}
	h4:first-child {
		margin-left: 15px;
		margin-bottom: 15px;
		font-size: 16px;
	}
	input[type="radio"] {
		display: none;
	}
`
const Container = styled.label`
	display: block;
	position: relative;
	padding-left: 35px;
	cursor: pointer;
	font-size: 22px;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
	}
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: ${({ height }) => height ? height : '25px'};
		width: ${({ width }) => width ? width : '25px'};
		background-color: #fff;
		border-radius: 50%;
		border: 4px solid ${({ borderColor }) => borderColor || '#eee'};
	}
	input:checked ~ .checkmark {
		background-color: ${({ activeColor }) => activeColor || '#fff'};
	}
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}
	input:checked ~ .checkmark:after {
		display: block;
	}
`
const apiURL = `${baseUrl}`
class QuizChoice extends React.Component {
	sendPersonalAnswer = async (event) => {
		try {
			const { candidateId } = this.props
			const answer = parseInt(event.target.value, 10)
			const testNumber = parseInt(event.target.dataset.testnumber, 10)
			const testName = event.target.dataset.testname
			const url = `${apiURL}/candidates/${candidateId}/answer`
			const personalResult = await Axios.post(url, {
				testName: testName,
				testNumber: testNumber,
				answer: answer
			})
			// console.log("After send answer : ", personalResult.data)
			await this.props.updateCurrentTest(personalResult.data.nextTestName)
			if (this.props.currentTest !== personalResult.data.nextTestName) {
				if (personalResult.data.nextTestName === 'finish') {
					this.props.history.push('/quiz-complete')
				}
				this.props.Loading()
				this.props.updateQuizPath()
				this.props.updateCurrentPage(personalResult.data.page)
				this.props.updateCurrentTest(personalResult.data.nextTestName)
				this.props.updateQuizPercent()
				this.props.LoadingSuccess()
			} else {
				this.props.updateCurrentPage(personalResult.data.page)
				this.props.updateQuizPercent()
			}

		} catch (err) {
			console.log(err)
		}
	}
	render() {
		const { radioName, quizTitle, testNumber, testName, oldAnswer } = this.props
		return (
			<QuizWrapper >
				<h4>{quizTitle}</h4>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<h4 style={{ color: '#09b29c' }}> ตรงมาก </h4>
					<Container
						height="50px"
						width="50px"
						borderColor="#09b29c"
						activeColor="#09b29c"
					>
						<input defaultChecked={`${oldAnswer === 5 ? 'checked' : ''}`} type="radio" name={radioName} data-testname={testName} value="5" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<Container
						style={{
							marginLeft: 20,
							marginTop: 5
						}}
						height="37px"
						width="37px"
						borderColor="#09b29c"
						activeColor="#09b29c"
					>
						<input defaultChecked={`${oldAnswer === 4 ? 'checked' : ''}`} type="radio" name={radioName} data-testname={testName} value="4" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<Container
						style={{
							marginLeft: 10,
							marginTop: 10
						}}
						activeColor="#eee"
					>
						<input defaultChecked={`${oldAnswer === 3 ? 'checked' : ''}`} type="radio" name={radioName} data-testname={testName} value="3" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<Container
						style={{
							marginTop: 5
						}}
						height="37px"
						width="37px"
						borderColor="#954590"
						activeColor="#954590"
					>
						<input defaultChecked={`${oldAnswer === 2 ? 'checked' : ''}`} type="radio" name={radioName} data-testname={testName} value="2" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<Container
						height="50px"
						width="50px"
						borderColor="#954590"
						activeColor="#954590"
						style={{
							marginLeft: 8
						}}
					>
						<input defaultChecked={`${oldAnswer === 1 ? 'checked' : ''}`} type="radio" name={radioName} data-testname={testName} value="1" data-testnumber={testNumber} onClick={this.sendPersonalAnswer} />
						<span className="checkmark"></span>
					</Container>
					<h4 style={{ color: '#954590' }}> ไม่ตรง </h4>
				</div>
			</QuizWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	candidateId: state.CandidateAuth.candidateId,
	currentPage: state.CurrentPage.currentPage,
	currentTest: state.Quiz.currentQuiz
})

export default connect(mapStateToProps,
	{
		updateQuizPath,
		updateCurrentPage,
		Loading,
		LoadingSuccess,
		updateCurrentTest,
		updateCog,
		updatePer,
		updateSS,
		updateWP,
		updateQuizPercent
	})(QuizChoice)