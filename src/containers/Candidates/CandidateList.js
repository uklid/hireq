import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import { LayoutContentWrapper } from '../../components/utility/layoutWrapper.style'
import Card from '../../containers/HireQComponent/Card'
import Checkbox from '../../containers/HireQComponent/Checkbox'
import Ionicon from 'react-ionicons'
import styled from 'styled-components'
import { FormGroup, FormControlLabel } from 'material-ui/Form'
import CandidatesTable from '../Candidates/components/Table'
import firebase from 'firebase'
import Axios from 'axios'
import { Loading, LoadingSuccess } from '../../redux/loading/actions'
import {
  updateAllCandidates,
  updateAllChecked,
  updateAllCheckedByOne
} from '../../redux/candidates/actions'
import { baseUrl } from '../../libs/url/baseUrl'

const InputWrapper = styled.div`
    position: relative;
    // width: 80%;

    .floating-icon {
        position: absolute;
    }
    .floating-textfield {
        margin-top: 0px;
        padding-left: 40px;
        width: 100%;
    }
`

const FilterField = ({ checked, onChange, value, label }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        onChange={onChange}
        value={value}
        style={{ color: '#954590' }}
      />
    }
    label={label}
  />
)

class PositionList extends React.Component {

  state = {
    showAll: false,
    showOpen: false,
    showFinished: false,
    candidateData: []
  }

  searchPoisition = (event) => {
    const filter = event.target.value.toUpperCase()
    // const { allCandidatesData } = this.props
    const searchResult = Object.values(this.state.candidateData).filter((obj) => {
      const name = obj['name'].toUpperCase().includes(filter)
      const email = obj['email'].toUpperCase().includes(filter)
      // ถ้ามี option ในการ search อย่างอื่นก็สามารถทำได้ เพิ่มตัว filter เข้าไป
      if (email || name) {
        return obj
      }
      return false
    })
    this.props.updateAllCandidates(searchResult)
    // this.setState({
    //   candidateData: searchResult
    // })
  }

  filterOnChange = (name) => async (event) => {
    await this.setState({
      [name]: !this.state[name],
    })

    if (this.state[name] && name === 'showFinished') {
      // const { allCandidatesData } = this.props
      // const { candidateData } = this.state
      const { allCandidatesData } = this.props
      const searchResult = Object.values(allCandidatesData).filter((obj) => {
        const emailSent = obj['emailSent'] === false
        // ถ้ามี option ในการ search อย่างอื่นก็สามารถทำได้ เพิ่มตัว filter เข้าไป
        if (emailSent) {
          return obj
        }
        return false
      })
      this.props.updateAllCandidates(searchResult)
      // this.setState({
      //   candidateData: searchResult
      // })
    } else if (!this.state[name] && name === 'showFinished') {
      // this.setState({
      //   candidateData: this.props.allCandidatesData
      // })
      this.props.updateAllCandidates(this.state.candidateData)
    }
  }
  componentDidMount = async () => {
    try {
      this.props.Loading()
      await firebase.auth().onAuthStateChanged(async (data) => {
        if (data) {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const uid = localStorage.getItem('loginToken')
          // start get all candidates here
          const candidatesURL = `${baseUrl}/users/${uid}/candidates`
          const candidatesResult = await Axios.get(candidatesURL, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          this.setState({ candidateData: candidatesResult.data })
          // console.log("Candidate List: ", candidatesResult.data)
          this.props.updateAllCandidates(candidatesResult.data)
          // end all candidate here
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
  onCheckAllChange = async (event) => {
    const allCheckBox = document.getElementsByClassName("ant-checkbox")
    if (event.target.checked === true) {
      // ไล่ลูบตั้งแต่  checkbox ในตำแหน่ง index ที่ 2 เนื่องจากไม่งั้นจะไปกวนกับตัว filter ด้านบน      
      for (let i = 2; i < allCheckBox.length; i++) {
        allCheckBox[i].classList.add("ant-checkbox-checked")
        if (allCheckBox[i].children[0].checked === false) {
          // Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
          allCheckBox[i].children[0].click()
        }
      }
      this.props.updateAllCheckedByOne(true)
      // this.props.updateAllChecked()
    } else {
      // ไล่ลูบตั้งแต่  checkbox ในตำแหน่ง index ที่ 2 เนื่องจากไม่งั้นจะไปกวนกับตัว filter ด้านบน
      for (let i = 2; i < allCheckBox.length; i++) {
        allCheckBox[i].classList.remove("ant-checkbox-checked")
        if (allCheckBox[i].children[0].checked === true) {
          // Hack ให้คลิกที่ input 1 ทีเพื่อแก้บัคในการ checkall เพื่อต้องกดอีกที
          await allCheckBox[i].children[0].click()
        }
      }
      // this.props.updateAllChecked()
      // this.props.updateUncheckCandidateId([])
      this.props.updateAllCheckedByOne(false)
    }
  }
  render() {
    const candidatesColumn = [
      {
        title: <Checkbox id="checkAllId" checked={this.props.allChecked} onChange={this.onCheckAllChange}>Check all</Checkbox>,
        dataIndex: 'checkbox',
        key: 'checkbox'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },

      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position',
      },
      {
        title: 'Sent On',
        dataIndex: 'sentDate',
        key: 'sentDate',
      },
      {
        title: 'Test Taken',
        dataIndex: 'tests.finished',
        key: 'tests.finished',
      },
      {
        title: 'ACTIONS',
        dataIndex: 'buttonAction',
        key: 'buttonAction'
      }
    ]
    return (
      <LayoutContentWrapper>
        <Grid container spacing={0}>
          <Grid item sm={12} xs={12}>
            <Card>
              <InputWrapper>
                <Ionicon className="floating-icon" icon="ios-search-outline" fontSize="35px" />
                <TextField
                  placeholder="Search candidates"
                  margin="normal"
                  className="floating-textfield"
                  onChange={this.searchPoisition}
                />
              </InputWrapper>
              {/* <ButtonWrapper>
                <Button
                  style={{ marginRight: 45 }}
                  onClick={this.searchPositionData}>Search</Button>
              </ButtonWrapper> */}
              <FormGroup style={{ marginLeft: 30, marginTop: 5 }} row>
                {/* <FilterField
                  checked={this.state.showAll}
                  onChange={this.filterOnChange('showAll')}
                  value="All"
                  label="All"
                /> */}
                <FilterField
                  checked={this.state.showOpen}
                  onChange={this.filterOnChange('showOpen')}
                  value="ppen"
                  label="Open"
                />
                <FilterField
                  checked={this.state.showFinished}
                  onChange={this.filterOnChange('showFinished')}
                  value="finished"
                  label="Test Taken"
                />
              </FormGroup>
            </Card>
          </Grid>
        </Grid>
        <Grid style={{ marginTop: 30 }} container spacing={0}>
          <Grid item sm={12} xs={12}>
            <Card
              title="Candidates List"
              style={{ overflowX: 'auto' }}
            >
              <CandidatesTable
                // dataSource={Object.values(this.state.candidateData)}
                dataSource={Object.values(this.props.allCandidatesData)}
                columns={candidatesColumn}
                rowPerPage={7}
                ellipsis={10}
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
  allCandidatesData: state.Candidates.allCandidatesData,
  prepareCreate: state.Positions.prepareCreate,
  headerToken: state.Auth.headerToken,
  allChecked: state.Candidates.allChecked
})

export default connect(mapStateToProps,
  {
    updateAllChecked,
    updateAllCandidates,
    Loading,
    LoadingSuccess,
    updateAllCheckedByOne,
  })(PositionList)