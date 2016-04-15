import React from 'react'

import SplashScanScreen from '../SplashScanScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'
import LoadingScreen from '../LoadingScreen.jsx'

import JoinBattleScreen from './JoinBattleScreen.jsx'
import ChooseAttackScreen from './ChooseAttackScreen.jsx'
import AttackingScreen from './AttackingScreen.jsx'
import DefeatedMonsterScreen from './DefeatedMonsterScreen.jsx'
import PlayerDiedScreen from './PlayerDiedScreen.jsx'

import { monsterFromId, playerFromCharacter, helloPlayer, attack, poll} from './Game.jsx'
import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'

const POLL_INTERVAL = 1000

class ForestPlayer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      screen: 0,
      number: props.number,
      player1: null,
      player2: null,
      monster: null,
    }

    this.screens = [
      SplashScanScreen, //  0
      JoinBattleScreen, //  1
      ChooseAttackScreen,// 2
      AttackingScreen,   // 3
      DefeatedMonsterScreen,
      PlayerDiedScreen,
    ].map(component => React.createFactory(component))
  }

  localPlayer() {
    return this.state.number === 1 ? this.state.player1 : this.state.player2
  }

  remotePlayer() {
    return this.state.number === 1 ? this.state.player2 : this.state.player1
  }

  stopPolling() {
    console.log('stopPolling()')
    clearInterval(this.pollTimer)
  }

  setIsLoading(isLoading) {
    this.setState({isLoading})
  }

  async hello() {
    this.stopPolling()
    this.setIsLoading(true)
    this.updateFromState(await helloPlayer(this.localPlayer(), this.state.number))
    this.setIsLoading(false)
    this.resumePolling()
  }

  async updateFromState(gameState) {
    console.log('updateFromState')
    console.log(gameState)
    let p1 = this.state.player1
    let p2 = this.state.player2

    if (gameState.player1.id !== "") {
      if (gameState.player1.id == p1.id) {
        p1.hp = gameState.player1.hitpoints
      } else {
        p1 = playerFromCharacter(await getCharacter(p1.id))
      }
    } else {
      p1 = null
    }

    if (gameState.player2.id !== "") {
      if (gameState.player2.id == p2.id) {
        p2.hp = gameState.player1.hitpoints
      } else {
        p2 = playerFromCharacter(await getCharacter(p2.id))
      }
    } else {
      p2 = null
    }

    // game server doesn't know about us. introduce ourselves again
    if (p1 == null && p2 == null) {
      console.log('game server doesn\'t know about us. send hello again')
      await this.hello()
      return
    }

    this.setState({
      player1: p1,
      player2: p2,
      monster: monsterFromId(gameState.monster.id),
    })
  }

  async onData(localPlayerId) {
    this.setIsLoading(true)

    // Ask the server to look up a character with this scan data
    const localCharacter = await getCharacter(localPlayerId)

    if (localCharacter == null) {
      // TODO: error screen if they don't have an account yet
      alert('you need an account first')
      window.location.reload()
    }
    const keyForLocalPlayer = this.state.number === 1 ? 'player1' : 'player2'

    // set local player
    this.setState({
      [keyForLocalPlayer]: playerFromCharacter(localCharacter),
    })

    await this.hello()
    this.setScreen(1)
  }

  async resumePolling() {
    this.stopPolling()
    this.pollTimer = setInterval(async () => {
      // check if monster has been hit, and display
      const {canAttack, gameState} = await poll(this.localPlayer().id)
      this.updateFromState(gameState)

      if (canAttack) {
        // TODO: enable buttons
        // I attack

        const dmg = calculateDamage(this.localPlayer())
        this.updateFromState(await attack(this.state.monster.id, this.localPlayer().id, dmg))
      }
    }, POLL_INTERVAL)
  }

  stopPolling() {
    console.log('stopPolling()')
    clearInterval(this.pollTimer)
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
      player1: this.state.player1,
      player2: this.state.player2,
      localPlayer: this.localPlayer(),
      remotePlayer: this.remotePlayer(),
      number: this.state.number,
      monster: this.state.monster,
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
