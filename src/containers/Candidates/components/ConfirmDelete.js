import React from 'react'
import { connect } from 'react-redux'
import { message } from 'antd'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { Loading, LoadingSuccess } from '../../../redux/loading/actions'
import { updateDeleteId, toggleDialog, updateAllCandidates } from '../../../redux/candidates/actions'
import firebase from 'firebase'
import Axios from 'axios'
import { baseUrl } from '../../../libs/url/baseUrl'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  color: white;
  border: 0px;
  height: 36px;
  width: 80px;
  cursor: pointer;
`
const ButtonContainer = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
`
class ConfirmDelete extends React.Component {

  deleteCandidate = async () => {
    this.props.Loading()
    await firebase.auth().onAuthStateChanged(async (data) => {
      if (data) {
        try {
          const getIdToken = await firebase.auth().currentUser.getIdToken()
          const { deleteId, allCandidatesData } = this.props
          const uid = localStorage.getItem('loginToken')
          const url = `${baseUrl}/users/${uid}/candidates/${deleteId}`
          await Axios.delete(url, {
            headers: { Authorization: "Bearer " + getIdToken }
          })
          const updateDataAfterDelete = Object.values(allCandidatesData).filter((candidate) => {
            return candidate.candidateId !== deleteId
          })
          this.props.updateAllCandidates({...updateDataAfterDelete})
          this.props.toggleDialog()
          this.props.LoadingSuccess()
          message.success('Delete candidate success', 10)
        } catch (err) {
          this.props.LoadingSuccess()
          message.error('Fail to delete candidate', 10)
          console.log(err)
        }
      } else {
        this.props.LoadingSuccess()
        console.log("ไม่มี")
      }
    })
  }
  render() {
    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure to delete ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonContainer>
          <ButtonStyled onClick={() => this.props.toggleDialog()} style={{backgroundColor: 'grey'}}>
            Disagree
          </ButtonStyled>
          <ButtonStyled onClick={this.deleteCandidate} style={{ backgroundColor: '#954590' }}>
            Agree
          </ButtonStyled>
          </ButtonContainer>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  allCandidatesData: state.Candidates.allCandidatesData,
  deleteId: state.Candidates.deleteId,
  positionId: state.Candidates.positionId,
  toggleDialog: state.Candidates.toggleDialog
})

export default connect(mapStateToProps, {
  Loading,
  LoadingSuccess,
  updateDeleteId,
  toggleDialog,
  updateAllCandidates
})(ConfirmDelete)