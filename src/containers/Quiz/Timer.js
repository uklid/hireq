import React from 'react'
import moment from 'moment'

const Timer = ({ timeNow }) => (
  <h1 style={{ color: 'red' }}>
    {moment.utc(timeNow).format("HH:mm:ss")}
  </h1>
)

export default connect(null, null)(Timer)