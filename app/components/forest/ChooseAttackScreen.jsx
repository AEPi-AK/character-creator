import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, getCharacter, updateCharacter, calculateDamagePlayer } from '../Character.jsx'


import './ChooseAttackScreen.less'

// requires: a player. namely, their experience points.
// ensures: prop chosenAttack is set to 0, 1, or 2, with 2 being the most advanced.

// onClick for active attacks currently sets chosen attack.
// will soon send user to "attacking monster" screen.

class ChooseAttackScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      attacks: [
        {
          name: 'Brash Strike',
          activeIcon: './static/img/attack1-active.svg',
          inactiveIcon: './static/img/attac1-inactive.svg',
          levelThresh: 0,
          activeDescription: 'Strike your enemy hard with a strong fist',
          inactiveDescription: null,
          available: true,
          variance: 4,
        },
        {
          name: 'Takedown Attack',
          activeIcon: './static/img/attack2-active.png',
          inactiveIcon: './static/img/attack2-inactive.png',
          levelThresh: 2,
          activeDescription: 'This swift and powerful attack will leave your enemies hurting',
          inactiveDescription: 'Secondary attack available at Level 2',
          variance: 8,
        },
        {
          name: 'Mighty Surge',
          activeIcon: './static/img/attack3-active.svg',
          inactiveIcon: './static/img/attack3-inactive.svg',
          levelThresh: DRAGONSLAYER_LEVEL,
          activeDescription: "You strike true, and your enemy's howl of pain is like music to your ears",
          inactiveDescription: 'Must be Dragon Slayer',
          variance: 10,
        },
      ]
    }
  }

    chooseAttack(i) {
      const dmg = calculateDamagePlayer(this.props.localPlayer, this.state.attacks[i])
      this.props.attack(dmg, this.state.attacks[i].name)
    }

    render() {

      const attacks = this.state.attacks.map((attack, i) => {
        let active = true;
        if (attack.levelThresh == DRAGONSLAYER_LEVEL && !this.props.localPlayer.isDragonSlayer) {
          active = false;
        }

        if (attack.levelThresh > this.props.localPlayer.level) {
          active = false
        }

        if (active) {
          var typeOfAttack = 'normal'
          if (attack.levelThresh == DRAGONSLAYER_LEVEL) {
            typeOfAttack = 'dragonslayer'
          }
          return (
            <div className={`attack-active-${typeOfAttack}`} key={i} onClick={() => this.chooseAttack(i)}>
              <div className='attack-name'>{attack.name}</div>
              <div className='icon'><img src={attack.activeIcon}/></div>
              <div className='text'>{attack.activeDescription}</div>
            </div>
          )
        }

        return (
          <div className='attack-inactive' key={i}>
            <div className='attack-name'>{attack.name}</div>
            <div className='icon'><img src={attack.inactiveIcon}/></div>
            <div className='text'>{attack.inactiveDescription}</div>
          </div>
        )
      })

        return (
          <div className='container'>
            <div className='choose-attack-title'>choose an attack</div>
            <div className='attack-container'>
              {attacks}
            </div>
          </div>
        )
    }
}

export default ChooseAttackScreen
