import React from 'react'
import Ionicon from 'react-ionicons'
import styled from 'styled-components'

const ToggleWrapper = styled.div`
	width: 100%;
	height: auto;
	margin-bottom: 14px;

	h4 {
		border-radius: 3px;
		background-color: #f1f3f6;
		padding: 13px 0px 13px 20px;
		margin-bottom: 10px;
		cursor: pointer;
	}
`

const Toggle = ({ title, isToggle, detail, onClick }) => (
	<ToggleWrapper onClick={onClick}>
		<h4>{title} <Ionicon style={{ float: 'right', marginRight: 10 }} icon={`ios-arrow-${isToggle ? 'forward' : 'down'}`} fontSize="20px" /></h4>
		{isToggle && <p style={{ padding: 10 }}>{detail}</p>}
	</ToggleWrapper>
)

export default Toggle