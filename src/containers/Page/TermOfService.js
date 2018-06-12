import React from 'react'
import Toggle from '../../components/toggle/Toggle'
import styled from 'styled-components'

const QuizWrapper = styled.div`
	height: 100%;
	padding: 30px;
	background-color: #f1f3f6;
`

const WhiteCard = styled.div`
	background-color: #fff;
	padding: 20px;
	margin-bottom: 30px;
`

const _mockPrivacy = []
for (let i = 1; i <= 10; i++) {
	_mockPrivacy.push({
		id: `stateIs${i}`,
		title: `privacy number ${i}`,
		detail: `Lorem ipsum xx number detail number xxx ${i}`
	})
}

class TermOfService extends React.Component {
	componentWillMount = () => {
		_mockPrivacy.map(data => {
			this.setState({
				[data.id]: false,
			})
			return false
		})
	}
	handleClick = (Id) => {
		this.setState({
			[Id]: !this.state[Id]
		})
	}
	render() {
		return (
			<QuizWrapper>
				<WhiteCard>
					<h3>Term of service.</h3>
					<p>
						These Terms of Service are a contract between you and hireQ.io. hireQ.io operates the hireQ ("hireQ Site") and collection and storage services therein (collectively the "Service"). By using the hireQ Site and any services accessible from the hireQ Site, you are agreeing to be bound by the following terms and conditions ("Terms of Service"). If you do not agree to these Terms of Service or any part thereof, your only remedy is to not use the hireQ Site or the Service. VIOLATION OF ANY OF THE TERMS BELOW WILL RESULT IN THE TERMINATION OF YOUR RIGHT TO USE THE HIREQ SITE, AND ANY ACCOUNT THAT YOU MAY HAVE CREATED AS PART OF THE SERVICE. YOU AGREE TO USE THE HIRQ SITE AT YOUR OWN RISK.
					</p>
					{
						_mockPrivacy.map((data, index) => (
							<Toggle
								key={index}
								title={data.title}
								isToggle={this.state[data.id]}
								detail={data.detail}
								onClick={() => this.handleClick(data.id)}
							/>
						))
					}
				</WhiteCard>
			</QuizWrapper>
		)
	}
}

export default TermOfService