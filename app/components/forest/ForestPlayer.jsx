import _ from 'lodash'
import React from 'react'

import SplashScanScreen from '../SplashScanScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'
import LoadingScreen from '../LoadingScreen.jsx'

import ChooseAttackScreen from './ChooseAttackScreen.jsx'
import YouNeedAccountScreen from './YouNeedAccountScreen.jsx'
import AttackingScreen from './AttackingScreen.jsx'
import DefeatedMonsterScreen from './DefeatedMonsterScreen.jsx'
import PlayerDiedScreen from './PlayerDiedScreen.jsx'

import { monsterFromId, playerFromCharacter, helloPlayer, attack, poll} from './Game.jsx'
import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'

const POLL_INTERVAL = 500

class ForestPlayer extends React.Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      isLoading: false,
      canAttack: false,
      screen: 0,
      number: props.number,
      player1: null,
      player2: null,
      monster: null,
    }
    this.gameEnded = false

    this.pollTimer = null

    this.screens = [
      SplashScanScreen, //  0
      ChooseAttackScreen, // 1
      AttackingScreen,   // 2
      DefeatedMonsterScreen, // 3
      PlayerDiedScreen, // 4
      YouNeedAccountScreen, // 5
    ].map(component => React.createFactory(component))
  }

  restart() {
    console.log('restarting')
    this.setState(this.initialState)
  }

  localPlayer() {
    return this.state.number === 1 ? this.state.player1 : this.state.player2
  }

  setIsLoading(isLoading) {
    this.setState({isLoading})
  }

  setScreen(index) {
    this.setState({screen: index})
  }

  async checkWin() {
    let playerVictory = false
    let monsterVictory = false

    if (this.localPlayer() && this.localPlayer().hp <= 0) {
      console.log('monStervictorty stiting true')
      monsterVictory = true
    }

    if (this.state.monster.hp <= 0) {
      playerVictory = true
    }

    if (!playerVictory && !monsterVictory) {
      console.log("BAILING OIT")
      return
    }

    this.gameEnded = true

    if (playerVictory) {
      this.setScreen(3)
    }
    if (monsterVictory) {
      console.log('monster victory setcreen call')
      this.setScreen(4)
    }

    if (this.state.player1) {
      this.state.player1.points += this.state.monster.pointsAwarded
      await updateCharacter(this.state.player1)
    }

    if (this.state.player1) {
      this.state.player1.points += this.state.monster.pointsAwarded
    }

    this.stopPolling()
  }

  async hello() {
    this.stopPolling()
    this.setIsLoading(true)
    this.updateFromState(await helloPlayer(this.localPlayer(), this.state.number))
    this.setIsLoading(false)
    this.resumePolling()
  }

  async attack(dmg, name) {
    console.log('attacking with name and dmg', name, dmg)
    // const dmg = calculateDamage(this.localPlayer())
    this.setScreen(2)
    await this.updateFromState(await attack(this.state.monster.id, this.localPlayer().id, dmg, name))
  }

  async updateFromState(gameState) {
    let p1 = this.state.player1
    let p2 = this.state.player2

    if (this.state.number == 1 && gameState.player1.id !== "") {
      if (gameState.player1.id == p1.id) {
        p1.hp = Math.max(0, gameState.player1.hitpoints)
      } else {
        p1 = playerFromCharacter(await getCharacter(p1.id))
      }
    } else {
      p1 = null
    }

    if (this.state.number == 2 && gameState.player2.id !== "") {
      if (gameState.player2.id == p2.id) {
        p2.hp = Math.max(0, gameState.player2.hitpoints)
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

    let mfi = monsterFromId(gameState.monster.id)
    mfi.hp = Math.max(0, gameState.monster.hitpoints)

    this.setState({
      player1: p1,
      player2: p2,
      monster: mfi,
    })

    await this.checkWin()
  }

  async onData(localPlayerId) {
    this.setIsLoading(true)

    // Ask the server to look up a character with this scan data
    const localCharacter = await getCharacter(localPlayerId)

    if (localCharacter == null) {
      this.setIsLoading(false)
      this.setScreen(5)
      return
    }
    const keyForLocalPlayer = this.state.number === 1 ? 'player1' : 'player2'

    // set local player
    this.setState({
      [keyForLocalPlayer]: playerFromCharacter(localCharacter),
    })

    await this.hello()
    this.setScreen(1)
  }


  async doPoll() {
    if (this.gameEnded) return
    const {canAttack, gameState} = await poll(this.localPlayer().id)
    this.updateFromState(gameState)

    if (canAttack) {
      if (this.gameEnded) return
      this.setState({canAttack})
      this.setScreen(1)
    }
  }

  async resumePolling() {
    this.stopPolling()
    this.pollTimer = setInterval(this.doPoll.bind(this), POLL_INTERVAL)
  }

  stopPolling() {
    return
    console.log('stopPolling()')
    clearInterval(this.pollTimer)
  }

  render() {
    const noMonster = !this.state.monster && this.state.screen > 0 && this.state.screen != 5

    if (this.state.isLoading || noMonster) {
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
      number: this.state.number,
      monster: this.state.monster,
      onData: this.onData.bind(this),
      attack: this.attack.bind(this),
      restart: this.restart.bind(this),
    }))

    return (
      <div className='screen'>
        {screens[this.state.screen]}
      </div>
    )
  }
}

export default ForestPlayer
