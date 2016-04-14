import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import './ChooseAttackScreen.less'

class ChooseAttackScreen extends React.Component {


    render() {
        const attacks = [
          {
            name: 'Brash Strike',
            activeIcon: './static/img/attack1-active',
            inactiveIcon: './static/img/attac1-inactive',
            levelThresh: 0,
            description: 'Brash strike is a 1st level fighter attack power',
          },
          {
            name: 'Takedown Attack',
            activeIcon: './static/img/attack2-active',
            inactiveIcon: './static/img/attack2-inactive',
            levelThresh: 2,
            description: 'This swift and powerful attack will leave your enemies hurting',
          },
          {
            name: 'Mighty Surge',
            activeIcon: './static/img/attack3-active',
            inactiveIcon: './static/img/attack3-inactiveIcon',
            levelThresh: 4,
            description: "You strike true, and your enemy's howl of pain is like music to your ears",
          },
        ]

        return (
            <div className='container'>
                Choose Attack
            </div>
        )
    }
}

export default ChooseAttackScreen
