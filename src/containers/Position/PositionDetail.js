import React from 'react'
import { withRouter } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { message } from 'antd'
import Checkbox from '../HireQComponent/Checkbox'
// import SpecifiedDomainRadarChart from '../../containers/Charts/recharts/charts/specifiedDomainRadarChart'
import { connect } from 'react-redux'
import { updatePositionDetail, preCreatePosition } from '../../redux/position/actions'
import { updateAllCandidates, updateAllCheckedByOne } from '../../redux/candidates/actions'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import Axios from 'axios'
import firebase from 'firebase'
import { baseUrl } from '../../libs/url/baseUrl'
import CandidatesTable from '../Candidates/components/Table'
import Ionicon from 'react-ionicons'
import Card from '../../containers/HireQComponent/Card'
import Dialog, {
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog'
import CreateCandidates from '../Candidates/CreateCandidates'
import Button from '../HireQComponent/Button'

const screenWidth = (window.innerWidth / 2) - 100 <= 250 ? 350 : 600

const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;
		width: 100%;
		border-radius: 5px;

		h4 {
			display: inline;
		}
`

// const ProgressStyled = styled(Progress) `
//   .ant-progress-bg {
//     background-color: #954590;
//   }
// `

// const ChartWrapper = styled.div`
// 	@media only screen and (max-width: 700px) {
// 		.isoChartWrapper {
// 			overflow-x: scroll;
// 		}
// 	}
// `

class PositionDetail extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			config: {
				componentName: 'SpecifiedDomainRadarChart',
				key: 'SpecifiedDomainRadarChart',
				title: 'Specified Domain Radar Chart',
				width: screenWidth,
				height: 500,
				colors: ['#BAA6CA', '#B7DCFA', '#FFE69A', '#788195'],
				angle: 30,
				domain: [0, 100],
				cx: 300,
				cy: 250,
				outerRadius: 150,
			},
			open: false
		}
	}
	componentDidMount = async () => {
		try {
			firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					this.props.Loading()
					const uid = localStorage.getItem('loginToken')
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					//ถ้าเข้าโดยตรงไม่ได้ ต้องส่ง location.state.positionDetail มาด้วย จะได้เอาไป set เป็น ไอดีครับ
					if (this.props.location.state === undefined) {
						this.props.history.push('/dashboard')
						this.props.LoadingSuccess()
						return
					}
					// ถ้ามาจากหน้า create alert message 
					if (this.props.location.state.message) {
						message.config({
							top: 100,
						})
						message.success(this.props.location.state.message, 13)
					}
					const positionId = this.props.location.state.positionDetail !== undefined ? this.props.location.state.positionDetail : false
					const url = `${baseUrl}/users/${uid}/positions/${positionId}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updatePositionDetail(result.data)

					// const candidatesURL = `${baseUrl}/users/${uid}/candidates`
					const candidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates`
					const candidatesResult = await Axios.get(candidateURL, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(candidatesResult.data)
					this.props.LoadingSuccess()
				} else {
					throw new Error("No User Login Data")
				}
			})
		} catch (err) {
			console.log(err)
		}
	}
	firstDatas = () => {
		const positionDetail = this.props.positionDetail.info
		const start = 1
		const last = 8
		return Object.values(positionDetail).slice(start, last).map((data, index) => {
			const dataName = Object.keys(positionDetail)[start + index]
			// Hack ถ้าตำแหน่งที่ 13 ของ index จะไม่แสดงเพราะ ไม่ใช่ max min
			// if (index <= 14) {
			return {
				subject: dataName,
				value: parseInt((data['min'] + data['max']) / 2, 10)
			}
			// }
			// return null
		})
	}
	secondDatas = () => {
		const positionDetail = this.props.positionDetail.info
		const start = 8
		const last = 15
		return Object.values(positionDetail).slice(start, last).map((data, index) => {
			const dataName = Object.keys(positionDetail)[start + index]
			// Hack ถ้าตำแหน่งที่ 13 ของ index จะไม่แสดงเพราะ ไม่ใช่ max min
			// if (index <= 15) {
			return {
				subject: `${dataName}`,
				value: parseInt((data['min'] + data['max']) / 2, 10)
			}
			// }
			// return null
		})
	}
	cogNativePercent = () => {
		const positionDetail = this.props.positionDetail.info
		const cogNumber = Object.values(positionDetail).slice(0, 1)
		return parseInt((cogNumber[0].max + cogNumber[0].min) / 2, 10)
	}
	onEditPositionClick = async (id) => {
		try {
			this.props.Loading()
			await firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${id}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.preCreatePosition({ ...result.data, positionId: id })
					this.props.LoadingSuccess()
					this.props.history.push({
						pathname: '/dashboard/edit-position',
						state: { positionId: id }
					})
				} else {
					this.props.LoadingSuccess()
					console.log("ไม่มี")
				}
			})
		} catch (err) {
			this.props.LoadingSuccess()
			console.log(err)
		}
	}
	newObjectCandidate = () => {
		// ฟังชั่นนี้ รีกรุ๊บของ array ใหม่ ให้มี candidateId เข้าไปด้วย
		return Object.values(this.props.allCandidatesData).map((data, index) => {
			return {
				...data,
				candidateId: Object.keys(this.props.allCandidatesData)[index]
			}
		})
	}
	onCheckAllChange = async (event) => {
		const allCheckBox = document.getElementsByClassName("ant-checkbox")
		if (event.target.checked === true) {
			for (let i = 1; i < allCheckBox.length; i++) {
				allCheckBox[i].classList.add("ant-checkbox-checked")
				if (allCheckBox[i].children[0].checked === false) {
					// Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
					allCheckBox[i].children[0].click()
				}
			}
			this.props.updateAllCheckedByOne(true)
			// this.props.updateAllChecked()
		} else {
			for (let i = 1; i < allCheckBox.length; i++) {
				allCheckBox[i].classList.remove("ant-checkbox-checked")
				if (allCheckBox[i].children[0].checked === true) {
					// Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
					await allCheckBox[i].children[0].click()
				}
			}
			// this.props.updateAllChecked()
			// this.props.updateUncheckCandidateId([])      
			this.props.updateAllCheckedByOne(false)
		}
	}
	handleToggle = () => {
		this.setState({
			open: !this.state.open
		})
	}
	render() {
		const { positionDetail, allCandidatesData } = this.props
		const candidatesColumn = [
			{
				title: <Checkbox id="checkAllId" checked={this.props.allChecked} onChange={this.onCheckAllChange}>Check all</Checkbox>,
				dataIndex: 'checkbox',
				key: 'checkbox'
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name',
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},

			{
				title: 'Telephone',
				dataIndex: 'telephone',
				key: 'telephone',
			},

			{
				title: 'Sent On',
				dataIndex: 'sentDate',
				key: 'sentDate',
			},
			{
				title: 'ACTIONS',
				dataIndex: 'buttonAction',
				key: 'buttonAction'
			}
		]
		if (Object.keys(positionDetail).length !== 0) {
		}
		return (
			<LayoutContentWrapper>
				<WhiteWrapper>
					<Grid container spacing={0}>
						<Grid item sm={6} xs={6}>
							<div><h4>Position Title: </h4><span> {positionDetail.name}</span></div>
							<div style={{ marginTop: 10, marginBottom: 10 }}><h4>Department: </h4><span> {positionDetail.department}</span></div>
							<div style={{ marginTop: 10, marginBottom: 10 }}><h4>Supervisor: </h4><span> {positionDetail.supervisor}</span></div>
							<div style={{ marginTop: 10, marginBottom: 10 }}><h4>Supervisor's Email: </h4><span> {positionDetail.supervisorEmail}</span></div>
							<div><h4>Job Description: </h4><span> {positionDetail.descriptions}</span></div>
						</Grid>
						<Grid style={{ display: 'flex', justifyContent: 'flex-end' }} item sm={6} xs={6}>
							<Ionicon
								style={{ cursor: 'pointer' }}
								icon="ios-cog"
								fontSize="35px"
								onClick={() => this.onEditPositionClick(this.props.location.state.positionDetail)}
								color="rgb(149, 69, 144)"
							/>
						</Grid>
						<div style={{marginTop: '20px'}}><h4><b>Target scores for this position are saved.</b></h4></div>
					</Grid>
				</WhiteWrapper>
				<Grid container spacing={0}>
					<Grid item>
						<Button
							type="primary"
							onClick={this.handleToggle}
							width="160px"
							marginTop="30px"
						>
							Add New Candidate
						</Button>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 20 }} container spacing={0}>
					<Grid item xs={12}>
						<WhiteWrapper>
						<Card
							title="Candidates"
							style={{ overflowX: 'auto' }}
						>
							<CandidatesTable
								dataSource={Object.keys(allCandidatesData).length !== 0 ? Object.values(this.newObjectCandidate()) : []}
								columns={candidatesColumn}
								rowPerPage={10}
								ellipsis={10}
							/>
						</Card>
						</WhiteWrapper>
					</Grid>
				</Grid>
				
				{/* Modal dialog */}
				<Dialog
					open={this.state.open}
					onClose={this.handleToggle}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth
				>
					<DialogTitle id="alert-dialog-title">Add New Candidate's Profile</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<CreateCandidates
								addPositionId={this.props.location.state.positionDetail}
							// onClick={this.add}
							/>
						</DialogContentText>
					</DialogContent>
				</Dialog>
				{/* end dialog modal */}
				{/* Dialog */}
			</LayoutContentWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	positionDetail: state.Positions.positionDetail,
	allCandidatesData: state.Candidates.allCandidatesData,
	allChecked: state.Candidates.allChecked
})

export default connect(mapStateToProps,
	{
		updatePositionDetail,
		Loading,
		LoadingSuccess,
		updateAllCandidates,
		updateAllCheckedByOne,
		preCreatePosition
	})(withRouter(PositionDetail))