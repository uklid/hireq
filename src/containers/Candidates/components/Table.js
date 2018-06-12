import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import styled from 'styled-components'
import RowData from './RowData'
import Axios from 'axios'
import { connect } from 'react-redux'
import { LoadingSuccess, Loading } from '../../../redux/loading/actions'
import { preCreatePosition, updatePreEditData } from '../../../redux/position/actions'
import { message } from 'antd'
import {
	updateDeleteId,
	toggleDialog,
	updateCandidateCheckId,
	updateAllChecked,
	updateUncheckCandidateId,
	updateAllCheckedByOne,
	updateAllCandidates
} from '../../../redux/candidates/actions'
import { baseUrl } from '../../../libs/url/baseUrl'
import Button from '../../HireQComponent/Button'

const TableStyled = styled.table`
    width: 100%;
		border-collapse: collapse;
`
const TRheadStyled = styled.tr`
    background-color: #F4ECF4;
    border-radius: 2px;
    height: 50px;
    width: 100%;
`
const THstyled = styled.th`
    border: 1px solid #F4ECF4;
    color: #788195;
    font-size: 13px;
    font-weight: bold;
    padding: 18px 30px;
`

const Pagination = styled.div`
	display: flex;
	justify-content: space-between;
`
const PaginationItem = styled.span`
    color: black;
    padding: 4px 8px;
    text-decoration: none;
    cursor: pointer;
    border-radius: 4px;
    border: solid 1px #d9d9d9;
    font-size: 12px;
		margin: 4px;
		background-color: ${props => props.currentPage === props.page && props.page ? '#954590' : 'white'};
    color: ${props => props.currentPage === props.page && props.page ? 'white' : 'black'};
`

const Ellipsis = styled.span`
    font-size: 20px;
    font-weight: bold;
`

class CandidatesTable extends Component {
	state = {
		currentPage: 1,
		createData: {},
		currentRow: null
	}
	forward = (numOfPage) => {
		if (this.state.currentPage < numOfPage) {
			this.setState({ currentPage: this.state.currentPage + 1 })
		}
	}
	backward = (numOfPage) => {
		if (this.state.currentPage > 1) {
			this.setState({ currentPage: this.state.currentPage - 1 })
		}
	}
	onEditCandidateClick = async (data) => {
		this.props.history.push({
			pathname: '/dashboard/candidate-detail',
			state: { candidateId: data.candidateId }
		})
	}
	onDeleteClick = async (id) => {
		const positionId = id.position
		const candidateId = id.candidateId
		this.props.updateDeleteId({ deleteId: candidateId, positionId: positionId })
		this.props.toggleDialog()
	}
	onSendEmailClick = async (id) => {
		this.props.Loading()
		await firebase.auth().onAuthStateChanged(async (data) => {
			if (data) {
				try {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/candidates/email`
					const result = await Axios.post(url, { candidateId: id.candidateId }, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					// filter update date in redux store
					const { allCandidatesData } = this.props
					const updateData = Object.values(allCandidatesData).map(item => {
						if (item.candidateId === id.candidateId) {
							const newItem = { ...item, sentDate: new Date().getTime() }
							return newItem
						}
						return { ...item }
					})
					this.props.updateAllCandidates(updateData)
					// ////////////////////
					message.success(`${result.data}`, 5)
					this.props.LoadingSuccess()
				} catch (err) {
					this.props.LoadingSuccess()
					console.log(err)
				}
			} else {
				this.props.LoadingSuccess()
			}
		})
	}
	sendAllEmail = async () => {
		const { candidateCheckId, allCandidatesData } = this.props
		this.props.Loading()
		await firebase.auth().onAuthStateChanged(async (data) => {
			if (data) {
				try {
					candidateCheckId.map(async id => {
						const getIdToken = await firebase.auth().currentUser.getIdToken()
						const uid = localStorage.getItem('loginToken')
						const url = `${baseUrl}/users/${uid}/candidates/email`
						const result = await Axios.post(url, { candidateId: id }, {
							headers: { Authorization: "Bearer " + getIdToken }
						})
						const updateData = await Object.values(allCandidatesData).map(item => {
							if (item.candidateId === id) {
								const newItem = { ...item, sentDate: new Date().getTime() }
								return newItem
							}
							return { ...item }
						})
						// console.log("updateData: " , updateData)
						await this.props.updateAllCandidates(updateData)
						// update candidate Data in redux
						message.success(`${result.data}`, 5)
					})
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
	onCheckboxChange = (data) => async (event) => {
		if (event.target.checked) {
			this.props.updateCandidateCheckId(data.candidateId)
		} else {
			const oldData = this.props.candidateCheckId
			const updateData = await oldData.filter(id => {
				if (id !== data.candidateId) {
					return id
				}
				return false
			})
			this.props.updateAllCheckedByOne(false)
			await this.props.updateUncheckCandidateId(updateData)
		}
	}
	render() {
		const { columns, dataSource, rowPerPage, ellipsis, tableId } = this.props
		const numOfPage = Math.ceil(dataSource.length / rowPerPage)
		const pages = [...Array(numOfPage).keys()];
		const startData = (this.state.currentPage - 1) * rowPerPage
		const endData = (this.state.currentPage) * rowPerPage
		return (
			<div>
				<TableStyled
					id={tableId}
				>
					<thead>
						<TRheadStyled>{columns.map((column, index) => (
							<THstyled key={index}><span>{column.title}</span></THstyled>
						))}
						</TRheadStyled>
					</thead>
					<tbody>
						{dataSource.length !== 0 && dataSource.slice(startData, endData).map((data, index) => (
							<RowData
								key={index}
								dataValue={data.candidateId}
								onCheckboxChange={this.onCheckboxChange(data)}
								seeDetailClick={() => {
									this.props.history.push({
										pathname: '/dashboard/candidate-detail',
										state: { candidateId: data.candidateId }
									})
								}}
								onEditCandidateClick={() => this.onEditPositionClick(data)}
								onSendEmailClick={() => this.onSendEmailClick(data)}
								onDeleteClick={() => this.onDeleteClick(data)}
								onClick={() => {
									this.props.preCreatePosition(data)
									this.props.history.push('/dashboard/create-position/create-setting')
								}}
								data={data}
								columns={columns}
							/>
						))}
					</tbody>
				</TableStyled>
				<Pagination style={{ marginTop: 10 }}>
					<Button onClick={this.sendAllEmail}>Send Email</Button>
					<div>
						<PaginationItem
							onClick={() => this.backward(numOfPage)}
						>
							&lt;
          </PaginationItem>
						{pages.length < ellipsis && pages.map((page, index) => (
							<PaginationItem
								key={index}
								currentPage={this.state.currentPage}
								page={page + 1}
								onClick={() => this.setState({ currentPage: page + 1 })}
							>
								{page + 1}
							</PaginationItem>
						))}
						{this.state.currentPage < 4 && pages.length >= ellipsis && (
							<React.Fragment>
								{pages.slice(0, 4).map((page, index) => (
									<PaginationItem
										key={index}
										currentPage={this.state.currentPage}
										page={page + 1}
										onClick={() => this.setState({ currentPage: page + 1 })}
									>
										{page + 1}
									</PaginationItem>
								))}
								<Ellipsis>...</Ellipsis>
								<PaginationItem
									currentPage={this.state.currentPage}
									page={numOfPage}
									onClick={() => this.setState({ currentPage: numOfPage })}
								>
									{numOfPage}
								</PaginationItem>
							</React.Fragment>
						)}

						{this.state.currentPage + 3 > numOfPage && pages.length >= ellipsis && (
							<React.Fragment>

								<PaginationItem
									currentPage={this.state.currentPage}
									page={1}
									onClick={() => this.setState({ currentPage: 1 })}
								>
									{1}
								</PaginationItem>
								<Ellipsis>...</Ellipsis>
								{pages.slice(numOfPage - 4, numOfPage).map(page => (
									<PaginationItem
										currentPage={this.state.currentPage}
										page={page + 1}
										onClick={() => this.setState({ currentPage: page + 1 })}
									>
										{page + 1}
									</PaginationItem>
								))}
							</React.Fragment>
						)}

						{this.state.currentPage + 2 < numOfPage && this.state.currentPage > 3 && pages.length >= ellipsis && (
							<React.Fragment>

								<PaginationItem
									currentPage={this.state.currentPage}
									page={1}
									onClick={() => this.setState({ currentPage: 1 })}
								>
									{1}
								</PaginationItem>
								<Ellipsis>...</Ellipsis>
								{pages.slice(this.state.currentPage - 2, this.state.currentPage + 1).map((page, index) => (
									<PaginationItem
										key={index}
										currentPage={this.state.currentPage}
										page={page + 1}
										onClick={() => this.setState({ currentPage: page + 1 })}
									>
										{page + 1}
									</PaginationItem>
								))}
								<Ellipsis>...</Ellipsis>
								<PaginationItem
									currentPage={this.state.currentPage}
									page={numOfPage}
									onClick={() => this.setState({ currentPage: numOfPage })}
								>
									{numOfPage}
								</PaginationItem>
							</React.Fragment>
						)}

						<PaginationItem
							onClick={() => this.forward(numOfPage)}
						>
							&gt;
                    </PaginationItem>
					</div>
				</Pagination>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	allPositionCreated: state.Positions.allPositionCreated,
	candidateCheckId: state.Candidates.candidateCheckId,
	allChecked: state.Candidates.allChecked,
	allCandidatesData: state.Candidates.allCandidatesData
})

export default connect(mapStateToProps,
	{
		preCreatePosition,
		updatePreEditData,
		Loading,
		LoadingSuccess,
		updateDeleteId,
		toggleDialog,
		updateCandidateCheckId,
		updateAllChecked,
		updateUncheckCandidateId,
		updateAllCheckedByOne,
		updateAllCandidates
	})(withRouter(CandidatesTable))