import React from 'react'

import Scanner from './Scanner.jsx'
import './SplashScreen.less'

class SplashScanScreen extends React.Component {

  render() {
    return (
      <div className='splash-container' onData={this.props.advanceScreen}>
        <Scanner ref='scanner' onData={this.props.onData}/>
        <img src='static/img/logo.png'/>
        <div className='cta'>scan card to battle</div>
      </div>
    )
  }

}

export default SplashScanScreen
