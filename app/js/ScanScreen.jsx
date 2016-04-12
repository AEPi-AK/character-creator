import React from 'react'
import ReactDOM from 'react-dom'

import '../less/ScanScreen.less'

class ScanScreen extends React.Component {

  onKeyUp(e) {
    if (e.keyCode == 13) {
      this.props.character.id = ReactDOM.findDOMNode(this.refs.scanner).value
      this.props.setCharacter(this.props.character)
      this.props.advanceScreen()
    }
  }

  onBlur() {
    this.refs.scanner.focus()
  }

  render() {
    return (
      <div>
        <input
          type='text'
          ref='scanner'
          onKeyUp={this.onKeyUp.bind(this)}
          autoFocus={true}
          onBlur={this.onBlur.bind(this)}
        />
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
