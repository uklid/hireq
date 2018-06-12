import React, { Component } from 'react'
import { Button, Dropdown, Menu, Icon } from 'antd'
import Checkbox from '../../HireQComponent/Checkbox'
import styled from 'styled-components'
import moment from 'moment'

const TRBodyStyled = styled.tr`
		height: 50px;
		background: ${props => props.isExpand ? '#954590' : 'white'};
		// background-color: ${props => props.isActive ? '#eee' : 'white'};
		border-bottom: solid 1px #e9e9e9;
`
// const TRInfoStyled = styled.tr`
//     height: 50px;
//     background: ${props => props.isExpand ? '#954590' : 'white'};
// `
const TDStyled = styled.td`
    font-size: 14px;
    padding: 18px 30px;
    color: ${props => props.isExpand ? 'white' : 'black'};
    border: ${props => props.isExpand ? '1px solid #954590' : ''};
`

const MoreInfoLink = styled.span`
		font-weight: 700;
    cursor: pointer;
`
const LinkStyled = styled.a`
	color: #954590;
`

const MenuStyled = styled(Menu) `
	border: 1px solid #e8e8e8;
	.list-item:hover {
		color: #954590 !important;
	}
`

const DropDownMenu = (props) => (
	<MenuStyled>
		<Menu.Item>
			<a
				className="list-item"
				onClick={props.seeDetailClick} target="_blank"
			>More Detail</a>
		</Menu.Item>
		{/* <Menu.Item>
			<a onClick={props.onEditPositionClick} target="_blank">Edit</a>
		</Menu.Item> */}
		<Menu.Item>
			<a
				className="list-item"
				onClick={props.onSendEmailClick} target="_blank">Send Email</a>
		</Menu.Item>
		<Menu.Item >
			<a onClick={props.onDeleteClick} style={{ color: 'red' }}>DELETE</a>
		</Menu.Item>
	</MenuStyled>
)

export default class RowData extends Component {
	state = {
		isExpand: false,
		isActive: false,
	}
	componentWillReceiveProps = (props) => {
		this.setState({ isExpand: false })
	}
	render() {
		const { data, columns } = this.props
		const dataWithInfo = {
			checkbox: <Checkbox
				defaultChecked={this.props.allChecked}
				onChange={this.props.onCheckboxChange}
				value={this.props.dataValue}
			>
			</Checkbox>,
			...data,
			sentDate: data.sentDate ? moment(data.sentDate).format("DD/MM/YY HH:mm:ss") : '',
			button: <Button
				onClick={this.props.onClick}
				style={{
					color: '#fff',
					backgroundColor: '#954590',
					borderColor: '#954590',
				}}>Create position</Button>,
			buttonAction:
				<Dropdown overlay={<DropDownMenu
					seeDetailClick={this.props.seeDetailClick}
					onEditPositionClick={this.props.onEditPositionClick}
					onSendEmailClick={this.props.onSendEmailClick}
					onDeleteClick={this.props.onDeleteClick}
				/>}>
					<LinkStyled className="ant-dropdown-link" href="#">
						ACTIONS <Icon type="down" />
					</LinkStyled>
				</Dropdown>
			,
			moreInfo: <MoreInfoLink onClick={() => this.setState({ isExpand: !this.state.isExpand })}>More Info</MoreInfoLink>
		}
		const totalCol = Object.keys(dataWithInfo)
		const MoreInfoBox = ({ className, children }) => (
			<td colSpan={totalCol.length} className={className}>
				{children}
			</td>
		)
		const MoreInfoBoxStyled = styled(MoreInfoBox) `
				box-sizing: border-box;
				border-left: 1px solid #954590;
				border-right: 1px solid #954590;
				border-bottom: 1px solid #954590;
				display: ${props => props.isExpand ? '' : 'none'};
				padding: 32px 16px;
		`
		return (
			<React.Fragment>
				<TRBodyStyled
					onClick={() => this.setState({ isActive: !this.state.isActive })}
					isActive={this.state.isActive}
					isExpand={this.state.isExpand}
				>
					{columns.map((key, index) => (
						<TDStyled
							isExpand={this.state.isExpand}
							key={index}
						>
							{dataWithInfo[key.key]}
						</TDStyled>
					))}
				</TRBodyStyled>
				<tr>
					<MoreInfoBoxStyled isExpand={this.state.isExpand}>
						<table style={{ width: '100%' }}>
							<thead>
								<tr>
									<td>
										{dataWithInfo ? dataWithInfo.descriptions : ''}
									</td>
								</tr>
							</thead>
						</table>
					</MoreInfoBoxStyled>
				</tr>
			</React.Fragment>
		)
	}
}
