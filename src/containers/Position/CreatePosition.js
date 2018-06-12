import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Card from '../../containers/HireQComponent/Card'
import Ionicon from 'react-ionicons'
import styled from 'styled-components'
import { FormGroup } from 'material-ui/Form'
import Button from '../HireQComponent/Button'
import Tables from './components/Table'
import firebase from 'firebase'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import {
	searchPosition,
	updatePositionData
} from '../../redux/position/actions'
import { baseUrl } from '../../libs/url/baseUrl'

const columns = [{
	title: 'Position Title',
	dataIndex: 'name',
	key: 'name',
}, {
	title: 'Category',
	dataIndex: 'category',
	key: 'category',
}, {
	title: 'More Info',
	dataIndex: 'moreInfo',
	key: 'moreInfo',
}, {
	title: '',
	dataIndex: 'button',
	key: 'button'
}]

const InputWrapper = styled.div`
    position: relative;
    width: 80%;

    .floating-icon {
        position: absolute;
    }
    .floating-textfield {
        margin-top: 0px;
        padding-left: 40px;
        width: 100%;
    }
`

const ButtonWrapper = styled.div`
		position: absolute;
		right: 37px;
		top: 30px;

		button {
			margin: 0px 10px 0px 10px;
			background-color: #954590;
			border-color: #954590;
		}
		@media only screen and (max-width: 768px) {
			display: none;
		}
`


// const FilterField = ({ checked, onChange, value, label }) => (
// 	<FormControlLabel
// 		control={
// 			<Checkbox
// 				checked={checked}
// 				onChange={onChange}
// 				value={value}
// 				style={{ color: '#954590' }}
// 			/>
// 		}
// 		label={label}
// 	/>
// )

class CreatePosition extends React.Component {

	state = {
		showAll: false,
		showOpen: false,
		showFinished: false,
	}
	componentWillMount = () => {
		// Hack set ให้มันเป็นค่าว่างรอการ search เสมอ ไม่งั้นหน้า position list จะไปใช้ 
		// state ใน store ตัวเดียวกัน
		this.props.updatePositionData([])
	}
	searchPositionData = async (event) => {
		try {
			this.props.Loading()
			const getIdToken = await firebase.auth().currentUser.getIdToken()
			const searchKeyword = document.getElementById('position-search').value
			const url = `${baseUrl}/jobs/search?keyword=${searchKeyword}`

			const result = await Axios.get(url, {
				headers: { Authorization: "Bearer " + getIdToken }
			})
			if (result.data !== 'No results found') {
				this.props.updatePositionData(result.data)
			}
			this.props.LoadingSuccess()
		} catch (err) {
			this.props.LoadingSuccess()
			console.log(err)
		}
	}
	goToSettingPosition = () => {
		this.props.history.push({
			pathname: '/dashboard/create-position/create-setting',
			state: { positionSetting: this.props.prepareCreate }
		})
	}

	filterOnChange = (name) => (event) => {
		this.setState({
			[name]: !this.state[name],
		})
	}
	searchPoisition = (event) => {
		if (event.key === 'Enter') {
			this.searchPositionData()
		}
	}

	render() {
		const { positionData } = this.props
		return (
			<LayoutContentWrapper>
				<Grid container spacing={0}>
					<Grid item sm={12} xs={12}>
						<Card>
							<InputWrapper>
								<Ionicon className="floating-icon" icon="ios-search-outline" fontSize="35px" />
								<TextField
									id="position-search"
									placeholder="What's the one word that best describes the position you are looking to fill?"
									margin="normal"
									className="floating-textfield"
									onKeyPress={this.searchPoisition}
								/>
							</InputWrapper>
							<ButtonWrapper>
								<Button
									style={{ marginRight: 45 }}
									onClick={this.searchPositionData}
								>Search</Button>
							</ButtonWrapper>
							<FormGroup row>
								{/* <FilterField
									checked={this.state.showAll}
									onChange={this.filterOnChange('showAll')}
									value="All"
									label="All"
								/>
								<FilterField
									checked={this.state.showOpen}
									onChange={this.filterOnChange('showOpen')}
									value="Open"
									label="Open"
								/>
								<FilterField
									checked={this.state.showFinished}
									onChange={this.filterOnChange('showFinished')}
									value="Finished"
									label="Finished"
								/> */}
							</FormGroup>
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 30 }} container spacing={0}>
					<Grid item sm={12} xs={12}>
						<Card
							title="Result"
							style={{ overflowX: 'auto' }}
						>
							<Tables
								key={`myTables`}
								tableId="myTable"
								dataSource={positionData ? Object.values(positionData) : []}
								columns={columns}
								rowPerPage={7}
								ellipsis={4}
							/>
						</Card>
					</Grid>
				</Grid>
				<Grid style={{ marginTop: 20 }} container spacing={0}>
					<Grid item>
						{/* <Button
							onClick={this.goToSettingPosition}
							style={{
								color: '#fff',
								backgroundColor: '#954590',
								borderColor: '#954590',
							}}>Create position</Button> */}
					</Grid>
				</Grid>
			</LayoutContentWrapper>
		)
	}
}

const mapStateToProps = (state) => ({
	searchPosition: state.Positions.searchPoisition,
	positionData: state.Positions.positionData,
	prepareCreate: state.Positions.prepareCreate,
	headerToken: state.Auth.headerToken
})

export default connect(mapStateToProps,
	{
		searchPosition,
		updatePositionData,
		Loading,
		LoadingSuccess,
	})(CreatePosition)