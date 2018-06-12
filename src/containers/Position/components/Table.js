import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import styled from 'styled-components'
import RowData from './RowData'
import Axios from 'axios'
import { connect } from 'react-redux'
import { LoadingSuccess, Loading } from '../../../redux/loading/actions'
import { preCreatePosition, updatePreEditData, updatePositionData } from '../../../redux/position/actions'
import { baseUrl } from '../../../libs/url/baseUrl'
import Button from '../../HireQComponent/Button'
import { Link } from 'react-router-dom'
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
	justify-content: flex-end;
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

class Tables extends Component {
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
	onEditPositionClick = async (id) => {
		try {
			this.props.Loading()
			await firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${id.positionId}`
					const result = await Axios.get(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.preCreatePosition({ ...result.data, positionId: id.positionId })
					this.props.LoadingSuccess()
					this.props.history.push({
						pathname: '/dashboard/edit-position',
						state: { positionId: id.positionId }
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
	onDeleteClick = async (id) => {
		try {
			this.props.Loading()
			await firebase.auth().onAuthStateChanged(async (data) => {
				if (data) {
					const getIdToken = await firebase.auth().currentUser.getIdToken()
					const uid = localStorage.getItem('loginToken')
					const url = `${baseUrl}/users/${uid}/positions/${id.positionId}`
					await Axios.delete(url, {
						headers: { Authorization: "Bearer " + getIdToken }
					})
					this.props.LoadingSuccess()
				} else {
					this.props.LoadingSuccess()
				}
			})
		} catch (err) {
			this.props.LoadingSuccess()
			console.log(err)
		}
	}
	onMarkAsCompletedClick = async (data) => {
		const markItem = await this.props.dataSource.map(item => {
			if (item.name === data.name) {
				if (item.status) {
					const data = { ...item, status: '' }
					return data
				} else {
					const data = { ...item, status: 'DONE' }
					return data
				}
			}
			return { ...item }
		})
		await this.props.updatePositionData(markItem)
		// console.log("this dataSource: ", this.props.dataSource)
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
								seeDetailClick={() => {
									this.props.history.push({
										pathname: '/dashboard/position-detail',
										state: { positionDetail: data.positionId }
									})
								}}
								onMarkAsCompletedClick={() => this.onMarkAsCompletedClick(data)}
								onEditPositionClick={() => this.onEditPositionClick(data)}
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
					{(this.props.withAddPosition && this.props.withAddPosition === true) &&
						<Link to='/dashboard/create-position'>
							<Button>Add a Position</Button>
						</Link>
					}

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
								{pages.slice(numOfPage - 4, numOfPage).map((page, index) => (
									<PaginationItem
										key={index}
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
	allPositionCreated: state.Positions.allPositionCreated
})

export default connect(mapStateToProps,
	{
		preCreatePosition,
		updatePreEditData,
		Loading,
		LoadingSuccess,
		updatePositionData
	})(withRouter(Tables))