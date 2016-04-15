import React from 'react'

import PlayerCard from './PlayerCard.jsx'
import MonsterCard from './MonsterCard.jsx'
import LoadingScreen from '../LoadingScreen.jsx'
import { playerFromCharacter, helloMonster, attack, poll, getRandomMonster } from './Game.jsx'
import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'

import './ForestMonster.less'

const POLL_INTERVAL = 1000
const TIME_TO_RESTART = 4000

class BattleText extends React.Component {

  render() {
    return (
      <div className='battle-text'>
        <span className={`color-${this.props.attacker.color}`}>{this.props.attacker.name}</span>
        <span className='color-silver'>uses {this.props.attack} on</span>
        <span className={`color-green-${this.props.defender.color}`}>{this.props.defender.name}</span>
      </div>
    )
  }

}

class ForestMonster extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      player1: null,
      player2: null,
      monster: null
    }
  }

  async updateFromState(gameState) {
    console.log('updateFromState')
    console.log(gameState)
    let p1 = this.state.player1
    let p2 = this.state.player2

    if (gameState.player1.id !== "") {
      if (p1 && gameState.player1.id == p1.id) {
        p1.hp = gameState.player1.hitpoints
      } else {
        p1 = playerFromCharacter(await getCharacter(gameState.player1.id))
      }
    } else {
      p1 = null
    }

    if (gameState.player2.id !== "") {
      if (p2 && gameState.player2.id == p2.id) {
        p2.hp = gameState.player1.hitpoints
      } else {
        p2 = playerFromCharacter(await getCharacter(gameState.player2.id))
      }
    } else {
      p2 = null
    }

    // TODO: If player has been damaged, animate whichever one has been damaged
    this.setState({
      player1: p1,
      player2: p2,
    })

    if (this.gameShouldEnd()) {
      this.stopPolling()
      if (p1) {
        p1.points += 50
        const r = await updateCharacter(p1)
      }
      if (p2) {
        p2.points += 50
        const r = await updateCharacter(p2)
      }
      alert('Game Over! Players have been awarded 50 points. New game in 5 seconds.')
      setTimeout(this.startNewGame.bind(this), TIME_TO_RESTART)
    }
  }

  stopPolling() {
    console.log('this.stopPolling()')
    clearInterval(this.pollTimer)
  }

  setIsLoading(isLoading) {
    this.setState({isLoading})
  }

  playersInGame() {
    return this.state.player1 || this.state.player2
  }

  gameShouldEnd() {
    if (!this.playersInGame()) {
      return false
    }

    if (this.state.player1.hp <= 0 && this.state.player2.hp <= 0) {
      return true
    }
    if (monster.hp <= 0) {
      return true
    }
    return false
  }

  async startNewGame() {
    this.setIsLoading(true)
    const newMonster = getRandomMonster()
    this.setState({
      monster: newMonster,
    })
    await helloMonster(newMonster)
    this.setIsLoading(false)
  }

  async resumePolling() {
    this.stopPolling()
    this.pollTimer = setInterval(async () => {
      // check if monster has been hit, and display
      const {canAttack, gameState} = await poll(this.state.monster.id)
      this.updateFromState(gameState)

      if (canAttack && this.playersInGame()) {
        // Attack a player at random
        const playerToAttack = Math.random() > 0.5 ? this.state.player1 : this.state.player2
        const dmg = calculateDamage(this.state.monster)
        this.updateFromState(await attack(playerToAttack.id, this.state.monster.id, dmg))
      }
    }, POLL_INTERVAL)
  }

  async componentDidMount() {
    await this.startNewGame()
    this.resumePolling()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen/>
    }
    let description
    if (!this.playersInGame()) {
      description = 'waiting for players'
    }
    // <BattleText attacker={this.state.monster} defender={this.state.player1} attack={'Axe Slash'}/>
    return (
      <div className='forest-monster-container'>
        <PlayerCard side={'left'} status={''} player={this.state.player1}/>
        <PlayerCard side={'right'} status={''} player={this.state.player2}/>
        <MonsterCard status={''} monster={this.state.monster}/>
        <div className='description-text'>
          {description}
        </div>
      </div>
    )
  }

}

export default ForestMonster
