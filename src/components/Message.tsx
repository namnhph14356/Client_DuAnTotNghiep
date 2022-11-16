import React from 'react'
import PropTypes from 'prop-types'
import {MessageOutlined} from '@ant-design/icons';
const Message = props => {
  return (
    <div>
        <MessageOutlined style={{ fontSize: '24px', color: '#08c' }} />
    </div>
  )
}

Message.propTypes = {}

export default Message