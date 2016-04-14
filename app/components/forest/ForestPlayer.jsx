import React from 'react'

import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import JoinBattleScreen from './JoinBattleScreen.jsx'
import ChooseAttackScreen from './ChooseAttackScreen.jsx'
import AttackingScreen from './AttackingScreen.jsx'
import DefeatedMonsterScreen from './DefeatedMonsterScreen.jsx'
import PlayerDiedScreen from './PlayerDiedScreen.jsx'

class ForestPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            screen: 0,
        }

        this.screens = [
            JoinBattleScreen,
            ChooseAttackScreen,
            AttackingScreen,
            DefeatedMonsterScreen,
            PlayerDiedScreen,
        ].map(component => React.createFactory(component))
    }

    setScreen(index) {
        this.setState({screen: index})
    }

    render() {
        const screens = this.screens.map(screen => screen({
          setScreen: this.setScreen.bind(this),
        }))

        return (
            <div className='screen'>
                {screens[this.state.screen]}
            </div>
        )
    }
}

export default ForestPlayer
