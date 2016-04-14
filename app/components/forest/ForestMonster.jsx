import React from 'react'

import PlayerCard from './PlayerCard.jsx'
import MonsterCard from './MonsterCard.jsx'
import { calculateLevel } from '../Character.jsx'
import { helloMonster, attack, poll } from './Game.jsx'

import './ForestMonster.less'

const POLL_INTERVAL = 1000

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
      monster: {
        race: 'gnoll',
        name: 'Forest Gnoll',
        hp: 330,
        hp_max: 500,
        level: 9,
        color: 'green-light',
      },
    }
  }

  updateFromState(gameState) {
    let p1 = this.state.player1
    let p2 = this.state.player2

    p1.hp = gameState.player1.hitpoints
    p2.hp = gameState.player2.hitpoints

    // player has been damaged, animate whichever one has been damaged
    this.setState({
      player1: p1,
      player2: p2,
    })

    if (this.gameShouldEnd()) {
      this.stopPolling()
      alert('game is over!!!!. pause polling. wait 5 seconds, then send new hello monster')
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
    // TODO: randomly choose what monster i am
    await helloMonster(this.state.monster)
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
        // TODO: generate dmg based on stats
        const dmg = 20
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
        // <PlayerCard side={'left'} status={'attacking'} player={player1}/>
    return (
      <div className='forest-monster-container'>
        <PlayerCard side={'left'} status={''} player={this.state.player1}/>
        <PlayerCard side={'right'} status={''} player={this.state.player2}/>
        <MonsterCard status={'defending'} monster={this.state.monster}/>
        <BattleText attacker={this.state.monster} defender={this.state.player1} attack={'Axe Slash'}/>
      </div>
    )
    }
}

export default ForestMonster
