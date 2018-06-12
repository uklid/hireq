import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../../components/uielements/button'
import { connect } from 'react-redux'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import { baseUrl } from '../../libs/url/baseUrl'
import { updateCandidateId } from '../../redux/candidatesAuth/actions'
import queryString from 'qs'
// import queryString from 'query-string'

const BeforeQuizWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url(${require('../../image/signin-image.jpg')}) no-repeat;
  background-size: cover;
`

const WhiteWrapper = styled.div`
  width: 400px;
  height: 250px;
  border-radius: 5px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 767px) {
    width: 90%;
    height: 375px;
  }
`

const BeforeQuizBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 83%;

  @media only screen and (max-width: 767px) {
    width: 85%;
  }
`
const apiURL = `${baseUrl}`

class BeforeQuiz extends React.Component {
  state = {
    startedTime: null,
    name: '',
    position: ''
  }
  componentWillMount = () => {

  }
  componentDidMount = async () => {
    //  Start Loading
    this.props.Loading()    
    const candidateId = queryString.parse(this.props.location.search, { ignoreQueryPrefix: true }).id
    this.props.updateCandidateId(candidateId)
    const url = `${apiURL}/candidates/${candidateId}/test`
    const requestResult = await Axios.get(url)
    const startedTime = requestResult.data.startedTime ? requestResult.data.startedTime : null
    this.setState({
      startedTime,
      name: requestResult.data.name,
      position: requestResult.data.position
    })
    //Loading SUccess
    this.props.LoadingSuccess()
  }
  getStartedQuiz = () => {
    this.props.history.push('/quiz')
  }
  render() {
    return (
      <BeforeQuizWrapper>
        <WhiteWrapper>
          <BeforeQuizBlock>
            <h1 style={{ textAlign: 'center' }}>{this.state.name}</h1>
            <p> position: {this.state.position} </p>
            <Button
              style={{
                width: '100%', backgroundColor: '#954590', color: '#fff'
              }}
              onClick={this.getStartedQuiz}
            >
              {this.state.startedTime !== null ? 'continue doing quiz' : 'start doing quiz'}
            </Button>
            <Link to="/privacy">Privacy</Link>
            <Link to="/term-of-privacy">Term of service</Link>
          </BeforeQuizBlock>
        </WhiteWrapper>
      </BeforeQuizWrapper>
    )
  }
}

const mapStateToProps = state => ({
  candidateId: state.CandidateAuth.candidateId
})

export default connect(mapStateToProps, { Loading, LoadingSuccess, updateCandidateId })(BeforeQuiz)