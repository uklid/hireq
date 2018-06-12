import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Input, message, Form, Select, Button } from 'antd'
import { LoadingSuccess, Loading } from '../../redux/loading/actions'
import { updateAllCandidates } from '../../redux/candidates/actions'
import Axios from 'axios'
import firebase from 'firebase'
import { baseUrl } from '../../libs/url/baseUrl'
import validator from 'validator'

const WhiteWrapper = styled.div`
    background-color: #fff;

    .create-group {
      margin: 10px;
    }
`

class CreateCandidates extends React.Component {
  state = {
    name: '',
    email: '',
    telephone: '',
    validEmail: 'notValid',
    validName: 'notValid',
    validTelephone: 'notValid',
    isDisabled: true,
  }
  onTextChange = (stateName) => (event) => {
    const { value } = event.target
    this.setState({
      [stateName]: value
    })
    // validate email
    if (stateName === 'email' && validator.isEmail(value) && !validator.isEmpty(value)) {
      this.setState({ validEmail: '' })
    } else if (stateName === 'email') {
      this.setState({
        isDisabled: true,
        validEmail: 'error'
      })
    }
    // validate name 
    if (stateName === 'name' && !validator.isEmpty(value)) {
      this.setState({ validName: '' })
    } else if (stateName === 'name') {
      this.setState({
        isDisabled: true,
        validName: 'error'
      })
    }
    // validate phone
    if (stateName === 'telephone' && !validator.isEmpty(value) && validator.isNumeric(value)) {
      this.setState({ validTelephone: '' })
    } else if (stateName === 'telephone') {
      this.setState({
        isDisabled: true,
        validTelephone: 'error'
      })
    }
    // Enable button if all validation Pass
    if (this.state.validEmail === '' && this.state.validTelephone === '' && this.state.validName === '') {
      this.setState({ isDisabled: false })
    }
    // Add validation
    // const inputName = stateName === 'email' ? 'validEmail' : 'validName'
    // if (this.state[stateName] === '') {
    //   this.setState({
    //     [inputName]: 'error'
    //   })
    // } else {

    //   this.setState({
    //     [inputName]: ''
    //   })
    // }
  }
  addCandidate = async () => {
    const { email, name, telephone } = this.state
    try {
      this.props.Loading()
      await firebase.auth().onAuthStateChanged(async (data) => {
        if (data) {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const uid = localStorage.getItem('loginToken')
          const positionId = this.props.addPositionId
          const addCandidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates/`
          await Axios.post(addCandidateURL, { name, email, telephone }, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          const candidateURL = `${baseUrl}/users/${uid}/positions/${positionId}/candidates`
          const resultCandidate = await Axios.get(candidateURL, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          this.props.updateAllCandidates(resultCandidate.data)
          this.setState({
            email: '',
            name: '',
            telephone: '',
          })
          this.props.LoadingSuccess()
          message.success('Successfully created the candidate', 10)
        } else {
          message.error('Ops somethings went wrong.')
          this.props.LoadingSuccess()
          console.log("ไม่มี")
        }
      })
    } catch (err) {
      this.props.LoadingSuccess()
      console.log(err)
    }
  }

  render() {
    return (
      <WhiteWrapper>
        {/* <h3>CREATE CANDIDATES</h3> */}
        <Form>
          <div className="create-group">
            <div>Name</div>
            <Form.Item
              validateStatus={this.state.validName}
              help={this.state.validName === 'error' && 'Please enter your name.'}
            >
              <Input
                type="text"
                onChange={this.onTextChange('name')}
                placeholder="Enter candidate's full name"
                defaultValue={this.state.name}
                value={this.state.name}
              />
            </Form.Item>
          </div>
          <div className="create-group">
            <div>Email</div>
            <Form.Item
              validateStatus={this.state.validEmail}
              help={this.state.validEmail === 'error' && 'Please enter your email.'}
            >
              <Input
                type="email"
                onChange={this.onTextChange('email')}
                placeholder="Enter candidate's email"
                defaultValue={this.state.email}
                value={this.state.email}
              />
            </Form.Item>
          </div>
          <div className="create-group">
            <div>Phone</div>
            <Form.Item
              validateStatus={this.state.validTelephone}
              help={this.state.validTelephone === 'error' && 'Please enter your Telephone.'}
            >
              <Input
                type="text"
                onChange={this.onTextChange('telephone')}
                placeholder="Enter candidate's phone number"
                defaultValue={this.state.telephone}
                value={this.state.telephone}
              />
            </Form.Item>
          </div>

          <div className="create-group">
            <Select
              style={{ width: 200 }}
              placeholder="Q-score Assessment"
              optionFilterProp="children"
            >
              <Select.Option value="q-score">Q-score Assessment</Select.Option>
            </Select>
          </div>
          <Button
            onClick={this.addCandidate}
            disabled={this.state.isDisabled}
            style={{
              color: '#fff',
              backgroundColor: this.state.isDisabled ? '#eee' : '#954590',
              marginTop: 30,
              borderColor: this.state.isDisabled ? '#eee' : '#954590',
              borderRadius: 16
            }}
          >
            Add This Candidate
          </Button>
        </Form>
      </WhiteWrapper>
    )
  }
}

export default connect(null, {
  Loading,
  LoadingSuccess,
  updateAllCandidates
})(CreateCandidates)