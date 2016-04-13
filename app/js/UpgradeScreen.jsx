import React from 'react'
import classNames from 'classnames'

import CharacterCard from './CharacterCard.jsx'
import { calculateLevel, DRAGONSLAYER_LEVEL } from './Game.jsx'

import '../less/UpgradeScreen.less'

class UpgradeScreen extends React.Component {

  isEligible() {
    return calculateLevel(this.props.character.experience) >= DRAGONSLAYER_LEVEL
  }

  upgrade() {
    if (!this.isEligible()) return
    alert('not implemented')
  }

  render() {
    const buttonClasses = classNames('upgrade-button', {
      'upgrade-button-ineligible': !this.isEligible()
    })
    return (
      <div className='upgrade-container'>
        <div className='title'>Welcome Back!</div>
        <CharacterCard character={this.props.character}/>
        <div className={buttonClasses} onClick={this.upgrade.bind(this)}>
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
        <div className='player-number'>Player No. {this.props.character.num}</div>
      </div>
    )
  }

}

export default UpgradeScreen
