import styled from 'styled-components'
import {Checkbox} from 'antd'

export default styled(Checkbox) `
  .ant-checkbox-inner ,.ant-checkbox-indeterminate .ant-checkbox-inner {
    border-radius: 50% !important;
    width: 20px;
    height: 20px;
  }
  .ant-checkbox-inner:after {
    top: auto !important;
    left: auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-indeterminate .ant-checkbox-inner {
    background-color: #954590 !important;
    border-color: #954590 !important;
    border-radius: 50%;
  }
  

   .ant-checkbox-checked .ant-checkbox-inner, .ant-checkbox-indeterminate .ant-checkbox-inner:checked:before {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`