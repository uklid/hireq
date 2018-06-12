import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import styled from 'styled-components'
import Grid from 'material-ui/Grid'
import { message, Input } from 'antd'
import ReportPersonal from './ReportPersonal'
import html2canvas from 'html2canvas'
import jspdf from 'jspdf'
import firebase from 'firebase'
import { connect } from 'react-redux'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import { updateAllCandidates } from '../../redux/candidates/actions'
import Ionicon from 'react-ionicons'
import Axios from 'axios'
import moment from 'moment'
import { baseUrl } from '../../libs/url/baseUrl'
import Button from '../HireQComponent/Button'

const WhiteCard = styled.div`
	display: flex;
	justify-content: flex-start;
	padding: 20px;
	background-color: #fff;
	margin-bottom: 30px;
	width: 100%;
	border-radius: 5px;
`

const FormWrapper = styled.div`
	width: 350px;
	padding: 10px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	p {
		margin: 0px;
	}
	h4 {
		margin: 0px;
	}
`

class CandidateDetail extends React.Component {
	state = {
		isEdit: false,
	}
	componentDidMount = async () => {
		if (!this.props.location.state) {
			this.props.history.push('/dashboard/candidate-list')
			return
		}
		const { candidateId } = this.props.location.state
		this.props.Loading()
		await firebase.auth().onAuthStateChanged(async (data) => {
			if (data) {
				try {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/candidates/${candidateId}`
					// console.log("Candidate Id : ", candidateId)
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(result.data)
					this.props.LoadingSuccess()
				} catch (err) {
					this.props.LoadingSuccess()
					console.log(err)
				}
			} else {
				this.props.LoadingSuccess()
				console.log("ไม่มี")
			}
		})
	}
	handleChange = (event) => {
		const { allCandidatesData } = this.props
		const name = event.target.getAttribute('name')
		const value = event.target.value
		allCandidatesData[name] = value
	}
	saveChange = async () => {
		this.props.Loading()
		const { candidateId } = this.props.location.state
		const positionId = this.props.allCandidatesData.position
		const { allCandidatesData } = this.props
		await firebase.auth().onAuthStateChanged(async (data) => {
			if (data) {
				try {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${positionId}/candidates/${candidateId}`
					await Axios.put(url, allCandidatesData, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.updateAllCandidates(allCandidatesData)
					this.props.LoadingSuccess()
					message.success('Update candidate success', 10)
				} catch (err) {
					this.props.LoadingSuccess()
					message.error('Fail to update candidate', 10)
					console.log(err)
				}
			} else {
				this.props.LoadingSuccess()
				console.log("ไม่มี")
			}
		})
	}
	renderPDFViaHtml = () => {
		this.props.Loading()
		const oldWidthScreen = document.getElementById("reportBody1").offsetWidth + "px"
		const newWidthScreen = "1177px"
		// Change Window width to 1280 before print
		document.getElementById("reportBody1").style.width = newWidthScreen
		document.getElementById("reportBody2").style.width = newWidthScreen
		document.getElementById("reportBody3").style.width = newWidthScreen

		// Change radar chart size
		const oldRadarStyle = document.getElementsByClassName("chartjs-render-monitor")[0].style
		const newRadarStyle = "display:block; height: 331px; width: 585px;"
		document.getElementsByClassName("chartjs-render-monitor")[0].style = newRadarStyle
		document.getElementsByClassName("chartjs-render-monitor")[1].style = newRadarStyle
		// //////
		// window.screen.width = 1280
		const { allCandidatesData } = this.props
		let doc = new jspdf()
		html2canvas(document.getElementById("reportBody1"), {
		}).then((canvas) => {
			canvas.style.width = "200px"
			canvas.style.height = "1712px" //Hack ไม่ว่าจอจะสูงหรือบานขนาดไหน ให้มันปรับเหลือแค่ 1712
			// canvas.setAttribute('style','width: 200')
			let data1 = canvas.toDataURL("image/jpeg", 1.0)
			canvas.width = 200
			let height = doc.internal.pageSize.height - 10
			doc.addImage(data1, 'JPEG', 5, 5, canvas.width, height)
			doc.addPage()
		})
		html2canvas(document.getElementById("reportBody2"), {
		}).then((canvas) => {
			canvas.style.width = "200px"
			canvas.style.height = "1712px" //Hack ไม่ว่าจอจะสูงหรือบานขนาดไหน ให้มันปรับเหลือแค่ 1712			
			let data1 = canvas.toDataURL("image/jpeg", 1.0)
			canvas.width = 200
			let height = doc.internal.pageSize.height - 70
			doc.addImage(data1, 'JPEG', 5, 5, canvas.width, height)
			doc.addPage()
		})
		html2canvas(document.getElementById("reportBody3"), {
		}).then((canvas) => {
			let data1 = canvas.toDataURL("image/jpeg", 1.0)
			let width = doc.internal.pageSize.width - 10
			doc.addImage(data1, 'JPEG', 5, 5, width, 200)
			doc.save(`${allCandidatesData.name}-${moment(new Date()).format("DD-MM-YY_HH-mm-ss")}.pdf`)
			// set window screen width to old resolution
			document.getElementById("reportBody1").style.width = oldWidthScreen
			document.getElementById("reportBody2").style.width = oldWidthScreen
			document.getElementById("reportBody3").style.width = oldWidthScreen

			document.getElementsByClassName("chartjs-render-monitor")[0].style = oldRadarStyle
			document.getElementsByClassName("chartjs-render-monitor")[1].style = newRadarStyle
			// window.screen.width = oldWidthScreen
			this.props.LoadingSuccess()
		})
	}
	render() {
		const { allCandidatesData } = this.props
		// const { candidateId } = this.props.location.state
		if (!this.props.location.state) {
			return <Redirect to="/dashboard/candidate-list" />
		}
		return (
			<div id="testBody1" >
				<LayoutContentWrapper >
					<Grid container spacing={0}>
						<WhiteCard>
							<Grid item xs={6}>
								<FormWrapper>
									<h4>NAME: </h4>
									{
										this.state.isEdit ?
											<Input
												name="name"
												onChange={this.handleChange} defaultValue={allCandidatesData.name}
												style={{ marginLeft: 16 }}
											/> : <p style={{ marginLeft: 10 }}>{allCandidatesData.name}</p>
									}
								</FormWrapper>
								<FormWrapper>
									<h4>EMAIL: </h4>
									{
										this.state.isEdit ?
											<Input
												name="email"
												onChange={this.handleChange}
												defaultValue={allCandidatesData.email}
												style={{ marginLeft: 16 }}
											/> : <p style={{ marginLeft: 10 }}>{allCandidatesData.email}</p>}
								</FormWrapper>
								<FormWrapper>
									<h4>POSITION: </h4>
									<p style={{ marginLeft: 10 }}>
										<Link to={{
											pathname: '/dashboard/position-detail',
											state: { positionDetail: allCandidatesData.position }
										}}
										>
											{allCandidatesData.position}
										</Link>
									</p>
								</FormWrapper>
							</Grid>
							<Grid item xs={6}
								style={{
									display: 'flex',
									justifyContent: 'space-between'
								}}
							>
								<FormWrapper style={{ alignSelf: 'flex-start' }}>
									<h4>CREATE TIME</h4>
									<p style={{ marginLeft: 10 }}>{moment(allCandidatesData.createdTime).format("DD/MM/YY HH:mm:ss")}</p>
								</FormWrapper>
								<div
									style={{ display: 'flex', justifyContent: 'space-between' }}
								>
									{this.state.isEdit && <Button onClick={this.saveChange}>Save Edit</Button>}
									<Ionicon
										style={{ cursor: 'pointer' }}
										icon="ios-cog"
										fontSize="35px"
										onClick={() => { this.setState({ isEdit: !this.state.isEdit }) }}
										color="rgb(149, 69, 144)"
									/>
								</div>
							</Grid>
						</WhiteCard>
					</Grid>
					<Grid style={{ backgroundColor: '#fff', borderRadius: 5, margin: 0 }} container spacing={8}>
						{/* <Grid item xs={12}>
							<h2 style={{ padding: 10 }}>Summary of Q-score Results</h2>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								<StickerWidget
									number="210"
									text="Unread Email"
									icon="ion-ios-infinite"
									fontColor="#ffffff"
									bgColor="#7263bc"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								<StickerWidget
									number="3024"
									text="Total Message"
									icon="ion-android-list"
									fontColor="#ffffff"
									bgColor="#42a5f5"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								<StickerWidget
									number="3024"
									text="Total Message"
									icon="ion-heart"
									fontColor="#ffffff"
									bgColor="#7ed321"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid>
						<Grid item sm={3} xs={12}>
							<IsoWidgetsWrapper>
								<StickerWidget
									number="3024"
									text="Total Message"
									icon="ion-trophy"
									fontColor="#ffffff"
									bgColor="#e05273"
									iconSize={36}
								/>
							</IsoWidgetsWrapper>
						</Grid> */}

						<Grid item xs={12}>
							<h3 style={{ padding: 10 }}>Report</h3>
							<Grid container style={{ padding: 20 }}>
								<Grid item xs={12}>
									<div id="testBody" ref={(elem) => this.Line1 = elem} >
										<ReportPersonal />
										{/* <img id="testImage" src="" /> */}
									</div>
									<Button marginTop="30px" onClick={this.renderPDFViaHtml}>Print Report.</Button>
								</Grid>
							</Grid>
						</Grid>
						{/* </WhiteCard> */}
					</Grid>

				</LayoutContentWrapper >
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	allCandidatesData: state.Candidates.allCandidatesData,
})

export default connect(mapStateToProps, {
	Loading,
	LoadingSuccess,
	updateAllCandidates
})(CandidateDetail)
