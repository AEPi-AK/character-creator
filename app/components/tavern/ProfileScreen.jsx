import React from 'react'
import classNames from 'classnames'
import sha256 from 'js-sha256'

import CharacterCard from '../CharacterCard.jsx'
import Scanner from '../Scanner.jsx'
import { updateCharacter, calculateLevel, DRAGONSLAYER_LEVEL } from '../Character.jsx'

import './ProfileScreen.less'
import './UpgradeScreen.less'

class UpgradeScreen extends React.Component {

  render() {
    return (
      <div className='scan-container'>
        <Scanner ref='scanner' onData={this.props.onData}/>
        <div className='header'>Upgrading to Dragon Slayer Card</div>
        <div className='cta'>scan new card to continue</div>
        <div className='id-card-container'>
          <img className='id-card' src='static/img/dragonslayer_front.png'/>
          <img className='id-card' src='static/img/dragonslayer_back.png'/>
          <div className='id-card-help'>Ask a booth attendant if you haven’t recieved your Dragon Slayer card.</div>
        </div>
      </div>
    )
  }

}

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inScanScreen: false,
    }
  }

  isDragonSlayer() {
    return Boolean(this.props.character.pro_id)
  }

  isEligible() {
    if (this.isDragonSlayer()) return false
    return calculateLevel(this.props.character.points) >= DRAGONSLAYER_LEVEL
  }

  onUpgrade() {
    if (!this.isEligible()) return
    this.setState({inScanScreen: true})
  }

  onBack() {
    this.props.restart()
  }

  async onData(data) {
    let character = this.props.character

    // Value from the scanner
    character.pro_id = sha256(data)

    this.props.setIsLoading(true)
    await updateCharacter(character)
    this.props.setIsLoading(false)

    this.props.setCharacter(character)
  }

  render() {
    if (this.state.inScanScreen) {
      return (
        <UpgradeScreen
          character={this.props.character}
          onData={this.onData.bind(this)}
        />
      )
    }
    const isDragonSlayer = this.isDragonSlayer()
    let greeting = [
      'Welcome Back',
      'Back Already?',
      'How Goes It?',
    ][Math.floor((Math.random() * 10) % 3)]
    if (isDragonSlayer) {
      greeting = 'Hail, Dragon Slayer!'
    }
    const classes = classNames('profile-container', {
      'profile-container-dragonslayer': isDragonSlayer,
    })
    const buttonClasses = classNames('upgrade-button', {
      'upgrade-button-ineligible': !this.isEligible()
    })
    return (
      <div className={classes}>
        <div className='title'>{greeting}</div>
        <CharacterCard character={this.props.character}/>
        <div className={buttonClasses} onClick={this.onUpgrade.bind(this)}>
          <img src='static/img/upgrade.svg'/>
          <div>Upgrade Card</div>
        </div>
        {
          this.isEligible() ?
            <div className='upgrade-text-eligible'>
              You’re eligible to upgrade to a DragonSlayer card! Ask a booth attendant if you haven’t recieved one.
            </div>
          :
            <div className='upgrade-text-ineligible'>
              Your character needs to be level 4 or higher to upgrade to a DragonSlayer card.
            </div>
        }
        {
          isDragonSlayer ?
          <div className='done-button' onClick={this.onBack.bind(this)}>
            <div>Done</div>
          </div>
          :
          <div className='back-button' onClick={this.onBack.bind(this)}>
            <div>Upgrade Later</div>
          </div>
        }
        <div className='player-number'>Player No. {this.props.character.number}</div>
      </div>
    )
  }

}

export default ProfileScreen
