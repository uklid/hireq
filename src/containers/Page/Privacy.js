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
		detail: `In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type, referring page and time of visit.

		Cookies may be used to remember visitor preferences when interacting with the website.
		
		Where registration is required, the visitor's email, first name, last name and a username will be stored on the server. Job seekers applying for jobs through our system, or entering the hireQ system through a third-party partner, may be required to provide additional contact information to the company they are applying to such as phone number, address as well as a resume and/or cover letter.${i}`
	})
}

class Privacy extends React.Component {
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
					<h3>Privacy.</h3>
					{
						_mockPrivacy.map(data => (
							<Toggle
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

export default Privacy