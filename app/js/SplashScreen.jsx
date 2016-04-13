import React from 'react'

import '../less/SplashScreen.less'

class SplashScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.advanceScreen}>
        <div className='pretitle'>
          <div className='pretitle-greek'>&Alpha;&Epsilon;&Pi;&nbsp;</div>Presents:
        </div>
        <img className='logo' src='static/img/dnd_logo_transparent.png'/>
        <div className='subtitle'>Exile from Morewood</div>
        <div className='splash-title cta'>tap screen to begin</div>
      </div>
    )
  }

}

export default SplashScreen
