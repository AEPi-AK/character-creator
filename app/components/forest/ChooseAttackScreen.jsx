import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'


import './ChooseAttackScreen.less'

class ChooseAttackScreen extends React.Component {

    render() {

        var exp = 0

        const attacks = [
          {
            name: 'Brash Strike',
            activeIcon: './static/img/attack1-active.svg',
            inactiveIcon: './static/img/attac1-inactive.svg',
            levelThresh: 0,
            activeDescription: 'Brash strike is a 1st level fighter attack power',
            inactiveDescription: null,
            available: true,
          },
          {
            name: 'Takedown Attack',
            activeIcon: './static/img/attack2-active.png',
            inactiveIcon: './static/img/attack2-inactive.png',
            levelThresh: 2,
            activeDescription: 'This swift and powerful attack will leave your enemies hurting',
            inactiveDescription: 'Available at level 2',
          },
          {
            name: 'Mighty Surge',
            activeIcon: './static/img/attack3-active.svg',
            inactiveIcon: './static/img/attack3-inactive.svg',
            levelThresh: DRAGONSLAYER_LEVEL,
            activeDescription: "You strike true, and your enemy's howl of pain is like music to your ears",
            inactiveDescription: 'Dragon Slayer attack available at level 4',
          },
        ].map((attack, i) => {
          var active = false;
          if (calculateLevel(exp)>=attack.levelThresh) {
            active = true;
          }

          if (active) {
            var typeOfAttack='normal'
            if (attack.levelThresh==DRAGONSLAYER_LEVEL)
              typeOfAttack='dragonslayer'
            return (
                <div className={`attack-active-${typeOfAttack}`} key={i}>
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
                {attacks}
            </div>
        )
    }
}

export default ChooseAttackScreen
