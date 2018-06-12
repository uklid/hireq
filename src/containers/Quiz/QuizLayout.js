import React from 'react'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import {
	Progress,
	Timeline,
	Layout,
	Tooltip
} from 'antd'
import Ionicon from 'react-ionicons'
import QuizChoice from './QuizChoice'
import QuizLogic from './QuizLogic'
import { connect } from 'react-redux'
import { decreaseTime, updateTimeFromApi } from '../../redux/timer/actions'
import moment from 'moment'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import { updateCurrentPage } from '../../redux/currentPage/actions'
import {
	updateQuizPercent,
	updateQuizPath,
	updateCurrentTest,
	updateCog,
	updatePer,
	updateSS,
	updateWP
} from '../../redux/quiz/actions'

const QuizWrapper = styled.div`
	height: 100%;
	padding: 30px;
	background-color: #f1f3f6; 

	.quiz-choice {
		width: 660px;
		margin-left: 50px;
	}

	.button-control {
		margin-left: 50px;
		width: 462px;
		display: flex;
		justify-content: space-around;
	}
	
	@media only screen and (max-width: 767px) {
		.quiz-choice {
			width: 100%;
			margin-left: 0px;
		}
		.button-control {
			margin-left: 0px;
			width: 100%;
			display: flex;
			justify-content: space-around;
		}
	}
`

const WhiteCard = styled.div`
	background-color: #fff;
	padding: 20px;
	margin-bottom: 30px;
`

const FlexCenter = styled.div`
	height: 140px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const ProgressWithStyled = styled(Progress) `
	.ant-progress-bg {
		background-color: #954590;
	}
`

const TimelineStyled = styled(Timeline) `
  #activeTimeline .ant-timeline-item-head {
		background-color: #954590;
		border-color: #954590 !important;
	}
`

const findQuizPath = (currentQuiz) => {
	switch (currentQuiz) {
		case 'cog':
			return {
				percent: 1,
				quizPath: 1
			}
		case 'per':
			return {
				percent: 25,
				quizPath: 2
			}
		case 'ss':
			return {
				percent: 50,
				quizPath: 3
			}
		case 'wp':
			return {
				percent: 75,
				quizPath: 4
			}
		default:
			return 0
	}
}

class QuizLayout extends React.Component {
	state = {
		quizArrayPosition: 0,
	}

	componentDidMount = async () => {
		try {
			const { apiURL, candidateId, timeNow, decreaseTime } = this.props
			// Dispatch loading when call api
			this.props.Loading()
			// /////////////////////
			const url = `${apiURL}/candidates/${candidateId}/test`
			const quizData = await Axios.get(url)
			const currentItem = quizData.data.currentItem - 1
			const currentTest = quizData.data.currentTest
			// ตำแหน่ง array เริ่มแรกในการตัดหน้า (currentPage - 1) * 10
			// set currentTest
			this.props.updateCurrentTest(currentTest)
			this.props.updateQuizPath(findQuizPath(currentTest).quizPath)
			this.props.updateCurrentPage(quizData.data.currentPage)
			this.props.updateTimeFromApi(quizData.data.startedTime)
			// set all test Data
			this.props.updateCog(quizData.data.cog)
			this.props.updatePer(quizData.data.per)
			this.props.updateSS(quizData.data.ss)
			this.props.updateWP(quizData.data.wp)

			this.props.updateQuizPercent()

			// Update Time 
			if (timeNow >= 0 && this.props.currentQuiz === 'cog') {
				setInterval(() => {
					decreaseTime()
				}, 1000)
			}
			// ////////////////////////////
			this.setState({
				quizArrayPosition: currentItem,
			})
			// after set api data to State SuccessLoading
			this.props.LoadingSuccess()
			// //////////////////////////////////////////
		} catch (err) {
			this.props.history.push('/404')
			this.props.LoadingSuccess()
			console.log(err)
		}
	}
	sendCogAnswer = async (event) => {
		//ADd Loading Spinner after send answer
		this.props.Loading()
		const { apiURL, candidateId } = this.props
		//////////////////////////
		const { answer } = event.target.dataset
		const url = `${apiURL}/candidates/${candidateId}/answer`
		const sendResult = await Axios.post(url, {
			testName: 'cog',
			testNumber: this.state.quizArrayPosition + 1,
			answer: parseInt(answer, 10),
		})
		// set State
		// Update currentTest or Quiz after send answer
		this.props.updateCurrentTest(sendResult.data.nextTestName)
		this.props.updateQuizPercent()
		////////////////////////
		const quizArrayPosition = this.state.quizArrayPosition += 1

		if (this.props.currentQuiz === 'cog') {
			this.setState({ quizArrayPosition })
		}
		if (this.props.currentQuiz === 'per') {
			this.props.updateCurrentTest('per')
			this.props.updateQuizPath()
		}
		//Remove Loading After Send Answer
		this.props.LoadingSuccess()
	}
	render() {
		const {
			quizArrayPosition,
		} = this.state
		const {
			timeNow,
			currentPage,
			lastPage,
			currentQuiz,
			quizDataCog,
			quizDataPer,
			quizDataSS,
			quizDataWP,
			quizPath,
			quizPercent,
		} = this.props
		//if timeout and currentQuiz = cog change to personal quiz
		if (timeNow < 0 && currentQuiz === 'cog') {
			// if timeout setState to another quizPath or redirect to another page
			this.props.updateCurrentTest('per')
		}
		// if CurrentQuiz = Finish redirect to done page
		if (currentQuiz === 'finish') {
			this.props.history.replace('/quiz-complete')
		}
		// Slice before map
		return (
			<Layout style={{ minHeight: '100%' }}>
				<QuizWrapper>
					<WhiteCard style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 200,
					}}
					>
						<div style={{ display: 'block', textAlign: 'center' }}>
							<h4>
								{currentQuiz === 'cog' && 'ส่วนที่ 1 - เชาวน์ปัญญา'}
								{currentQuiz === 'per' && 'ส่วนที่ 2 - บุคลิกภาพ'}
								{currentQuiz === 'ss' && 'ส่วนที่ 3 - '}
								{currentQuiz === 'wp' && 'ส่วนที่ 4 - '}
							</h4>
							<h4>
								{currentQuiz === 'cog' && 'จงพิจารณาความสัมพันธ์ของอนุกรมภาพต่อไปนี้ แล้วหาภาพที่มีความสัมพันธ์ต่อเนื่องจากภาพดังกล่าว'}
								{currentQuiz === 'per' && 'ข้อความต่อไปนี้ตรงกับบุคลิกของท่านเพียงใด'}
								{currentQuiz === 'ss' && ''}
								{currentQuiz === 'wp' && ''}
							</h4>
							<h1 style={{ color: 'red' }}>
								{
									timeNow >= 1 && currentQuiz === 'cog' && moment.utc(timeNow).format("HH:mm:ss")
								}
							</h1>
						</div>
					</WhiteCard>
					<WhiteCard>
						<Grid container spacing={0}>
							<Grid item xs={12}>
								<FlexCenter>
									<div style={{ width: 500 }}>
										<ProgressWithStyled percent={quizPercent} status="active" />
									</div>
								</FlexCenter>
							</Grid>
						</Grid>
						<Grid container spacing={0}>
							<Grid
								style={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-start',
									alignItems: 'center'
								}}
								item
								sm={3}
								xs={12}
							>
								<TimelineStyled>
									<Timeline.Item id={`${currentQuiz === 'cog' && 'activeTimeline'}`} color={`${quizPath > 1 ? '#954590' : '#eee'}`}>ส่วนที่ 1 </Timeline.Item>
									<Timeline.Item id={`${currentQuiz === 'per' && 'activeTimeline'}`} color={`${quizPath > 2 ? '#954590' : '#eee'}`}>ส่วนที่ 2</Timeline.Item>
									<Timeline.Item id={`${currentQuiz === 'ss' && 'activeTimeline'}`} color={`${quizPath > 3 ? '#954590' : '#eee'}`}>ส่วนที่ 3 </Timeline.Item>
									<Timeline.Item id={`${currentQuiz === 'wp' && 'activeTimeline'}`} color={`${quizPath > 4 ? '#954590' : '#eee'}`}>ส่วนที่ 4</Timeline.Item>
								</TimelineStyled>
								<Tooltip title="tool Hint">
									<Ionicon icon="ios-information-circle" fontSize={30} />
								</Tooltip>
								<Tooltip title="prompt text">
									<span>Tooltip will show when mouse enter.</span>
								</Tooltip>
							</Grid>
							<Grid item sm={9} xs={12}>
								<div className="quiz-choice">
									{
										// Quiz Path COG
										currentQuiz === 'cog' && quizDataCog.length >= 1 && quizArrayPosition <= 24 &&
										<QuizLogic
											onClick={this.sendCogAnswer}
											imageDetail={`${Object.values(quizDataCog)[quizArrayPosition].img}`}
											quizImage={require(`../../image/QuizImage/Question/${Object.values(quizDataCog)[quizArrayPosition].img}`)}
											imageData={Object.values(quizDataCog)[quizArrayPosition].cs}
										/>
									}
									{
										//  Quiz Path Per
										currentQuiz === 'per' && quizDataPer.length >= 1 &&
										Object.values(quizDataPer).slice(currentPage, lastPage).map((data, index) => {
											const oldAnswer = data.a !== undefined ? data.a : null
											const indexKey = (currentPage + index) + 1
											return (
												<QuizChoice
													key={`personal-quiz-${indexKey}`}
													radioName={`personal-quiz-${indexKey}`}
													quizTitle={data.th}
													testNumber={indexKey}
													testName='per'
													oldAnswer={oldAnswer}
												/>
											)
										})
									}
									{
										//  Quiz Path SS
										currentQuiz === 'ss' && quizDataSS.length >= 1 &&
										Object.values(quizDataSS).slice(currentPage, lastPage).map((data, index) => {
											const oldAnswer = data.a ? data.a : null
											const indexKey = (currentPage + index) + 1
											return (
												<QuizChoice
													key={`softskill-quiz-${indexKey}`}
													radioName={`softskill-quiz-${indexKey}`}
													quizTitle={data.th}
													testNumber={indexKey}
													testName='ss'
													oldAnswer={oldAnswer}
												/>
											)
										})
									}
									{
										// Quiz Path WP
										currentQuiz === 'wp' && quizDataWP.length >= 1 &&
										Object.values(quizDataWP).slice(currentPage, lastPage).map((data, index) => {
											const oldAnswer = data.a ? data.a : null
											const indexKey = (currentPage + index) + 1
											return (
												<QuizChoice
													key={`wp-quiz-${indexKey}`}
													radioName={`wp-quiz-${indexKey}`}
													quizTitle={data.th}
													testNumber={indexKey}
													testName='wp'
													oldAnswer={oldAnswer}
												/>
											)
										})
									}
								</div>
							</Grid>
						</Grid>
					</WhiteCard>
				</QuizWrapper>
			</Layout>
		)
	}
}

const mapStateToProps = (state) => ({
	apiURL: state.CandidateAuth.apiURL,
	candidateId: state.CandidateAuth.candidateId,
	timeNow: state.Time.time,
	currentPage: state.CurrentPage.currentPage,
	lastPage: state.CurrentPage.lastPage,
	quizPath: state.Quiz.quizPath,
	quizPercent: state.Quiz.quizPercent,
	currentQuiz: state.Quiz.currentQuiz,
	quizDataCog: state.Quiz.quizDataCog,
	quizDataPer: state.Quiz.quizDataPer,
	quizDataSS: state.Quiz.quizDataSS,
	quizDataWP: state.Quiz.quizDataWP
})

export default connect(mapStateToProps,
	{
		updateQuizPercent,
		decreaseTime,
		Loading,
		LoadingSuccess,
		updateTimeFromApi,
		updateCurrentPage,
		updateCurrentTest,
		updateQuizPath,
		updateCog,
		updatePer,
		updateSS,
		updateWP
	})(QuizLayout)
