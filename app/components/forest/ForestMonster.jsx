import React from 'react'

import PlayerCard from './PlayerCard.jsx'
import MonsterCard from './MonsterCard.jsx'
import { helloMonster, attack, poll, getRandomMonster } from './Game.jsx'
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
      player1: {
        race: 'Human',
        name: 'Player 98',
        hp: 49,
        hp_max: 110,
        level: calculateLevel(15),
        points: 15,
        color: 'yellow',
        isDragonSlayer: false,
      },
      player2: {
        race: 'Elf',
        name: 'Player 33',
        hp: 49,
        hp_max: 300,
        level: calculateLevel(999),
        points: 999,
        color: 'yellow',
        isDragonSlayer: true,
      },
      monster: null
    }
  }

  playerFromCharacter(character) {
    let player = character
    player.hp =
    player.level = calculateLevel(character.points)
    player.hp_max = calculateHp(character)
    player.hp = player.hp_max
    player.isDragonSlayer = player.level >= DRAGONSLAYER_LEVEL
    player.color = toSet.isDragonSlayer ? 'red' : 'yellow'
    player.name = caracter.name
    player.race = character.race
    return player
  }

  async updateFromState(gameState) {
    let p1 = this.state.player1
    let p2 = this.state.player2

    p1.hp = gameState.player1.hitpoints
    p2.hp = gameState.player2.hitpoints

    if (gameState.player1.id) {
      if (gameState.player1.id != p1.id) {
        p1 = this.playerFromCharacter(await getCharacter(p1.id))
      }
    } else {
      p1 = null
    }

    if (gameState.player2.id) {
      if (gameState.player2.id != p2.id) {
        p2 = this.playerFromCharacter(await getCharacter(p2.id))
      }
    } else {
      p2 = null
    }

    // player has been damaged, animate whichever one has been damaged
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
    console.log('stopPolling()')
    clearInterval(this.pollTimer)
  }

  playersInGame() {
    return Boolean(this.state.player1.id) && Boolean(this.state.player2.id)
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
    const newMonster = getRandomMonster()
    this.setState({
      monster: newMonster,
    })
    return await helloMonster(newMonster)
  }

  async resumePolling() {
    this.pollTimer = setInterval(async () => {
      console.log('polling')
      // check if monster has been hit, and display
      const res = await poll(this.state.monster.race)
      if (res.can_attack && this.playersInGame()) {
        // choose a player at random
        let playerToAttack = this.state.player1
        if (Math.random() > 0.5) {
          playerToAttack = this.state.player2
        }
        const dmg = calculateDamage(this.state.monster)
        const stateAfterAttack = await attack(playerToAttack, this.state.monster, dmg)

        this.updateFromState(stateAfterAttack)
      }
    }, POLL_INTERVAL)
  }

  async componentDidMount() {
    this.startNewGame()
    this.resumePolling()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  render() {
    if (!this.state.monster) {
      return <h1>loading</h1>
    }
    return (
      <div className='forest-monster-container'>
        <PlayerCard side={'left'} status={''} player={this.state.player1}/>
        <PlayerCard side={'right'} status={''} player={this.state.player2}/>
        <MonsterCard status={''} monster={this.state.monster}/>
        <BattleText attacker={this.state.monster} defender={this.state.player1} attack={'Axe Slash'}/>
      </div>
    )
  }

}

export default ForestMonster
