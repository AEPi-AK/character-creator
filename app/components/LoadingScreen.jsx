import React from 'react'
import Spinner from 'react-spinkit'

import './LoadingScreen.less'

class LoadingScreen extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='screen-loading'>
        <Spinner noFadeIn={true} spinnerName='circle'/>
          <div className='button loading-try-again' onClick={this.props.onTryAgain}>
            <div>Try Again?</div>
          </div>
      </div>
    )
  }

}

export default LoadingScreen
