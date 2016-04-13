import React from 'react'
import ReactDOM from 'react-dom'
import sha256 from 'js-sha256'

import { getCharacter } from './Game.jsx'

import '../less/ScanScreen.less'

class ScanScreen extends React.Component {

  async onKeyUp(e) {
    // Only when the return key is pressed
    if (e.keyCode !== 13) return

    let character = this.props.character

    // Value from the scanner
    character.id = sha256(ReactDOM.findDOMNode(this.refs.scanner).value)

    // Ask the server to look up a character with this scan data
    const characterFromServer = await getCharacter(character.id)
    if (characterFromServer != null) {
      character = characterFromServer
    }
    this.props.setCharacter(character)

    if (characterFromServer) {
      // Returning character; continue to UpgradeScreen
      this.props.advanceScreen(7)
    } else {
      // New character; continue to CreateScreen.
      this.props.advanceScreen()
    }
  }

  onBlur() {
    this.refs.scanner.focus()
  }

  render() {
    return (
      <div className='scan-container'>
        <input
          type='text'
          ref='scanner'
          onKeyUp={this.onKeyUp.bind(this)}
          autoFocus={true}
          onBlur={this.onBlur.bind(this)}
        />
        <div className='header'>Welcome, brave adventurer!</div>
        <div className='cta'>scan card to continue</div>
        <div className='id-card-container'>
          <img className='id-card' src='static/img/id_pitt.png'/>
          <img className='id-card' src='static/img/id_cmu.png'/>
          <div className='id-card-help'>If you do not have a Student ID, ask a booth attendant and we will provide you with a scannable card.</div>
        </div>
      </div>
    )
  }

}

export default ScanScreen
