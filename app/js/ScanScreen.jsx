import React from 'react'

import '../less/ScanScreen.less'

class ScanScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.advanceScreen}>
        <div className='scan-title'>Welcome, brave adventurer!</div>
        <div className='scan-cta'>scan card to continue</div>
        <div className='scan-card-container'>
          <img className='scan-card' src='static/img/id_pitt.png'/>
          <img className='scan-card' src='static/img/id_cmu.png'/>
          <div className='scan-help'>If you do not have a Student ID, ask a booth attendant and we will provide you with a scannable card.</div>
        </div>
      </div>
    )
  }

}

export default ScanScreen
