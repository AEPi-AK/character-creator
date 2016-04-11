import React from 'react'

import '../less/SplashScreen.less'

class SplashScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.advanceScreen}>
        <div className='pretitle'>&Alpha;&Epsilon;&Pi; Presents:</div>
        <img className='logo' src='static/img/dnd_logo_transparent.png'/>
        <div className='subtitle'>Exile from Morewood</div>
        <div className='cta pulsate'>tap to begin</div>
      </div>
    )
  }

}

export default SplashScreen
