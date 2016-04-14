import React from 'react'
import sha256 from 'js-sha256'

import Scanner from './Scanner.jsx'
import { getCharacter } from './Character.jsx'

import '../less/ScanScreen.less'

class ScanScreen extends React.Component {

  async onData(data) {
    let character = this.props.character

    // Value from the scanner
    character.id = sha256(data)

    this.props.setIsLoading(true)
    // Ask the server to look up a character with this scan data
    const characterFromServer = await getCharacter(character.id)
    if (characterFromServer != null) {
      character = characterFromServer
    }
    this.props.setCharacter(character)
    this.props.setIsLoading(false)

    if (characterFromServer) {
      // Returning character; continue to UpgradeScreen
      this.props.advanceScreen(7)
    } else {
      // New character; continue to CreateScreen.
      this.props.advanceScreen()
    }
  }

  render() {
    return (
      <div className='scan-container'>
        <Scanner ref='scanner' onData={this.onData.bind(this)}/>
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
