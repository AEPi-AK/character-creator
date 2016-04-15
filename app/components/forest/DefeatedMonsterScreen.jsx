import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'
import CharacterCard from '../CharacterCard.jsx'

import './DefeatedMonsterScreen.less'
import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'

//requires how many experience points the player gained
//requires all information about the player to display in a player card

//todo: "new battle" button that redirects to splash screen

class DefeatedMonsterScreen extends React.Component {

  render() {
    console.log(this.props.localPlayer)
    return (
      <div className='container'>
        <div className='defeated-title'>You have slain the beast!</div>
        <div className='defeated-subtitle'>
          Your character has gained {50} experience points.
        </div>
        <div className='character-card-container'>
          <CharacterCard character={this.props.localPlayer}/>
        </div>
        <div className='new-battle-button' onClick={this.props.restart}>new battle</div>
      </div>
    )
  }

}

export default DefeatedMonsterScreen
