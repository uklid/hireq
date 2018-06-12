import React from 'react'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Grid from 'material-ui/Grid'
import Card from '../../components/uielements/card'
import styled from 'styled-components'
import { Table, DatePicker, Slider, Button } from 'antd'
import Tables from './components/Table'
import CriticalSoftSkills from './CriticalSoftSkills'
import moment from 'moment'
import WorkPreference from './WorkPreference'
import Dialog, {
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from 'material-ui/Dialog'
import ToggleDisplay from 'react-toggle-display'

const SliderStyled = styled(Slider) `
  .ant-slider-handle {
	border: solid 2px #954590;
  }
  .ant-slider-track {
	background-color: #954590;
  }
`
const Span = styled.span`
	font-weight: 800;
	margin-right: 5px;
`

const WhiteWrapper = styled.div`
		background-color: #fff;
		padding: 20px;

		h4 {
			display: inline;
		}
`

const columns = [
	{
		title: 'First Name',
		dataIndex: 'firstName',
		key: 'firstName',
	},
	{
		title: 'Last Name',
		dataIndex: 'lastName',
		key: 'lastName',
	},
	{
		title: 'Email',
		dataIndex: 'email',
		key: 'email',
	},
	{
		title: 'Complete',
		dataIndex: 'complete',
		key: 'complete',
	},
	{
		title: 'Q-Score',
		dataIndex: 'qScore',
		key: 'qScore',
	}
]

const dataSouce = []
const dataSouce2 = []
const dataSouce3 = []
for (let i = 0; i <= 30; i++) {
	dataSouce.push({
		firstName: `Mike Number ${i}`,
		lastName: `Mike Last Name ${i}`,
		email: `xxx${i}@email.com`,
		complete: `${i}/xx/2000`,
		qScore: `q  - score : ${i + Math.random()}`
	})
	dataSouce2.push({
		firstName: `Mike Number ${i}`,
		lastName: `Mike Last Name ${i}`,
		email: `xxx${i}@email.com`,
		complete: `${i}/xx/2000`,
		qScore: `q  - score : ${i + Math.random()}`
	})
	dataSouce3.push({
		firstName: `Mike Number ${i}`,
		lastName: `Mike Last Name ${i}`,
		email: `xxx${i}@email.com`,
		complete: `${i}/xx/2000`,
		qScore: `q  - score : ${i + Math.random()}`
	})
}
class EditPosition1 extends React.Component {
	state = {
		open: false,
		showEdit: true,
	}

	handleClose = () => {
		this.setState({ open: false })
	}

	handleOpen = () => {
		this.setState({ open: true })
	}

	openEdit = () => {
		this.setState({ showEdit: !this.state.showEdit })
	}

	render() {
		return (
			<LayoutContentWrapper>
				<Grid container spacing={24}>
					<Grid item sm={4} xs={12}>
						<Card>
							<p> <Span>Position Name: </Span> Accountant </p>
							<p> <Span>Category: </Span> Finance </p>
							<p> <Span>Info: </Span> 123123123123123123123 </p>
						</Card>
						<Card title="Candidate" >

						</Card>
					</Grid>
					<Grid item sm={8} xs={12}>
						<Card
							title="Outstanding Candidates"
							style={{ overflowX: 'scroll' }}
						>
							<Tables
								dataSource={dataSouce}
								columns={columns}
								rowPerPage={10}
								ellipsis={10}
							/>
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 40 }} container spacing={24}>
					<Grid item sm={12} xs={12}>
						<Card>
							<h3 style={{ marginBottom: 30, cursor: 'pointer' }} onClick={this.openEdit}>Edit Position Detail.</h3>
							<ToggleDisplay show={this.state.showEdit}>
								<Grid container spacing={0}>
									<Grid item sm={12} xs={12}>
										<p>
											<span> Start Date: {`${moment(new Date()).format("DD/MM/YY")}`}</span>
											<span style={{ marginLeft:70}}>
												End Date: <DatePicker onChange={onChange} />
											</span>
										</p>
										<Grid container style={{ marginTop: 30 }}>
											<Grid item sm={2} xs={12}> Cognative Skill: </Grid>
											<Grid item sm={4} xs={12}><SliderStyled range defaultValue={[30, 50]} /></Grid>
										</Grid>
									</Grid>
									<Grid style={{ paddingTop: 60 }} container spaceing={24}>
										<Grid item sm={6} xs={12}>
											<CriticalSoftSkills />
										</Grid>
										<Grid item sm={6} xs={12}>
											<WorkPreference />
										</Grid>
									</Grid>
								</Grid>
								<Grid container spacing={0}>
									<Grid item>
										<Button
											type="primary"
											onClick={this.handleOpen}
											style={{ backgroundColor: '#954590', marginTop: 30, borderColor: '#954590' }}
										>
											Save change.
									</Button>
									</Grid>
								</Grid>
							</ToggleDisplay>
						</Card>
					</Grid>
				</Grid>
				{/* <ToggleDisplay style={this.state.showEdit ? { width: '100%' } : {}} show={this.state.showEdit}> */}
				{
					this.state.showEdit &&
					<div style={{ width: '100%' }}>
						<Grid style={{ marginTop: 40 }} container spacing={0}>
							<Grid item sm={12} xs={12}>
								<Card
									title="Complete Candidates"
									style={{
										overflowX: 'scroll'
									}}
								>
									<Tables
										dataSource={dataSouce2}
										columns={columns}
										rowPerPage={10}
										ellipsis={10}
									/>
								</Card>
							</Grid>
						</Grid>
						<Grid style={{ marginTop: 40 }} container spacing={0}>
							<Grid item sm={12} xs={12}>
								<Card
									title="Uncomplete Candidates"
									style={{
										overflowX: 'scroll'
									}}
								>
									<Tables
										dataSource={dataSouce3}
										columns={columns}
										rowPerPage={10}
										ellipsis={10}
									/>
								</Card>
							</Grid>
						</Grid>
						<Grid style={{ marginTop: 30 }} container spacing={0}>
							<Grid item>
								<Button style={{ color: '#fff', backgroundColor: '#954590' }}>
									Add Candidates.
								</Button>
							</Grid>
						</Grid>
					</div>
				}
				{/* </ToggleDisplay> */}
				{/* Dialog modal from material ui */}
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button style={{ float: 'left' }} onClick={this.handleClose}>
							Disagree
            </Button>
						<Button style={{ float: 'right' }} onClick={this.handleClose}>
							Agree
            </Button>
					</DialogActions>
				</Dialog>
				{/* end dialog modal */}
			</LayoutContentWrapper>
		)
	}
}

export default EditPosition1