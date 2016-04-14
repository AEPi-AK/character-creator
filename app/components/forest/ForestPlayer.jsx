import React from 'react'

import SplashScanScreen from '../SplashScanScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'
import LoadingScreen from '../LoadingScreen.jsx'

import JoinBattleScreen from './JoinBattleScreen.jsx'
import ChooseAttackScreen from './ChooseAttackScreen.jsx'
import AttackingScreen from './AttackingScreen.jsx'
import DefeatedMonsterScreen from './DefeatedMonsterScreen.jsx'
import PlayerDiedScreen from './PlayerDiedScreen.jsx'

import { helloPlayer, attack, poll} from './Game.jsx'
import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'

const POLL_INTERVAL = 1000

class ForestPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          screen: 0,
          player: null,
          player2: null,
          isLoading: false,
        }

        this.screens = [
          SplashScanScreen,
          JoinBattleScreen,
          ChooseAttackScreen,
          AttackingScreen,
          DefeatedMonsterScreen,
          PlayerDiedScreen,
        ].map(component => React.createFactory(component))
    }

  playerFromCharacterWithId(id, character) {
    let player = {}
    player.level = calculateLevel(character.points)
    player.hp_max = calculateHp(character)
    player.hp = player.hp_max
    player.isDragonSlayer = player.level >= DRAGONSLAYER_LEVEL
    player.color = player.isDragonSlayer ? 'red' : 'yellow'
    player.name = character.name
    player.race = character.race
    return player
  }

  setIsLoading(isLoading) {
    this.setState({isLoading})
  }

  async onData(data) {
    let player = this.state.player

    this.setIsLoading(true)
    // Ask the server to look up a character with this scan data
    const character = await getCharacter(data)
    if (character == null) {
      // TODO: error screen if they don't have an account yet
      window.location.reload()
    }
    this.setIsLoading(false)

    this.setState({
      screen: 1,
      player: this.playerFromCharacterWithId(data, character)
    })
  }

    setScreen(index) {
        this.setState({screen: index})
    }

    render() {
      if (this.state.isLoading) {
        return (
          <div className='screen'>
            <LoadingScreen onTryAgain={() => window.location.reload()}/>
          </div>
        )
      }
      const screens = this.screens.map(screen => screen({
        setScreen: this.setScreen.bind(this),
        player: this.state.player,
        otherPlayer: this.state.otherPlayer,
        onData: this.onData.bind(this),
      }))

      return (
          <div className='screen'>
              {screens[this.state.screen]}
          </div>
      )
    }
}

export default ForestPlayer
