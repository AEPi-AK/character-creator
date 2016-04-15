import React from 'react'
import './YouNeedAccountScreen.less'

class YouNeedAccountScreen extends React.Component {

  render() {

    return (
      <div className='need-account-container'>
        <div className='message'>
          Before you battle, please create a character at a Character Creator station in the Tavern.
        </div>

        <div className='button' onClick={() => this.props.restart()}>
          OK
        </div>

      </div>
    )
  }

}

export default YouNeedAccountScreen
