import React, { Component } from "react"
import { connect } from "react-redux"
import { Layout } from "antd"
import appActions from "../../redux/app/actions"
import TopbarUser from "./topbarUser"
import TopbarWrapper from "./topbar.style"
import themes from "../../settings/themes"
import { themeConfig } from "../../settings"
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const { Header } = Layout
const { toggleCollapsed } = appActions
const customizedTheme = themes[themeConfig.theme]

const TextStyled = styled.span`
  font-size: 17px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.87);
`
class Topbar extends Component {
  render() {
    const { toggleCollapsed } = this.props
    const collapsed = this.props.collapsed && !this.props.openDrawer
    const styling = {
      background: customizedTheme.backgroundColor,
      position: "fixed",
      width: "100%",
      height: 70
    }
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
          }
        >
          <div className="isoLeft">
            <button
              className={
                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
              }
              style={{ color: customizedTheme.textColor }}
              onClick={toggleCollapsed}
            />
            {/* <Link to="/dashboard">
              dashboard
            </Link> */}
            <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard">
              <TextStyled>Dashboard</TextStyled>
            </Link>
            <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/create-position">
              <TextStyled>Add a Position</TextStyled>
            </Link>
            <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/position-list">
              <TextStyled>Positions</TextStyled>
            </Link>
            <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/candidate-list">
              <TextStyled>Candidates</TextStyled>
            </Link>
            {/* <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/edit-position">
              <TextStyled>Edit - Position</TextStyled>
            </Link>
            <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/position-detail">
              <TextStyled>Position Detail</TextStyled>
            </Link>
            <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/candidate-detail">
              <TextStyled>Candidate Detail</TextStyled>
            </Link> */}
            {/* <Link style={{ marginLeft: 10, marginRight: 10 }} to="/dashboard/report">
              <TextStyled>Report</TextStyled>
            </Link> */}
          </div>

          <ul className="isoRight">
            <li
              onClick={() => this.setState({ selectedItem: "user" })}
              className="isoUser"
            >
              <TopbarUser />
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    )
  }
}

export default connect(
  state => ({
    ...state.App.toJS()
  }),
  { toggleCollapsed }
)(Topbar)
