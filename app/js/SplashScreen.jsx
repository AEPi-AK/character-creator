import React from 'react'

import '../less/SplashScreen.less'

class SplashScreen extends React.Component {

  render() {
    return (
      <div className='splash-container' onClick={this.props.advanceScreen}>
        <img src='static/img/logo.png'/>
        <div className='cta'>tap screen to begin</div>
      </div>
    )
  }

}

export default SplashScreen
