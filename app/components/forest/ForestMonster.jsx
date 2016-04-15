import _ from 'lodash'
import React from 'react'

import PlayerCard from './PlayerCard.jsx'
import MonsterCard from './MonsterCard.jsx'
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
      description: null,
      player1: null,
      player2: null,
      monster: null
    }

    this.pollTimer = null
    this.gameIsEnding = false
    // this.updateFromState = _.throttle(this._updateFromState, POLL_INTERVAL)

    this.UPDATE_LOCK = true
  }

  async componentDidMount() {
    await this.newGame()
  }

  componentWillUnmount() {
    this.stopPolling()
  }

  setIsLoading(isLoading) {
    this.setState({isLoading})
  }

  updateDescription() {
    if (!this.playersInGame()) {
      this.state.description = 'waiting for players'
    }
  }

  playersInGame() {
    return this.state.player1 || this.state.player2
  }

  gameShouldEnd() {
    if (!this.playersInGame()) {
      return false
    }

    if (this.state.player1 && !this.state.player2) {
      if (this.state.player1.hp <= 0) {
        return true
      }
    }
    else if (this.state.player2 && !this.state.player1) {
      if (this.state.player2.hp <= 0) {
        return true
      }
    }
    else {
      if (this.state.player1.hp <= 0 && this.state.player1.hp <= 0) {
        return true
      }
    }

    if (this.state.monster.hp <= 0) {
      // TODO: we lost!
      return true
    }
    return false
  }

  async updateFromState(gameState) {
    console.log('updateFromState')
    console.log(gameState)
    let p1 = this.state.player1
    let p2 = this.state.player2

    if (gameState.player1.id !== "") {
      if (p1 && gameState.player1.id == p1.id) {
        p1.hp = Math.max(0, gameState.player1.hitpoints)
      } else {
        p1 = playerFromCharacter(await getCharacter(gameState.player1.id))
      }
    } else {
      p1 = null
    }

    if (gameState.player2.id !== "") {
      if (p2 && gameState.player2.id == p2.id) {
        p2.hp = Math.max(0, gameState.player2.hitpoints)
      } else {
        p2 = playerFromCharacter(await getCharacter(gameState.player2.id))
      }
    } else {
      p2 = null
    }

    let monster = this.state.monster
    monster.hp = Math.max(0, gameState.monster.hitpoints)

    // TODO: If player has been damaged, animate whichever one has been damaged
    this.setState({
      player1: p1,
      player2: p2,
      monster,
    })

    this.updateDescription()

    if (this.gameShouldEnd()) {
        await this.endGame()
    }
  }

  async newGame() {
    this.gameIsEnding = false
    this.setIsLoading(true)
    const newMonster = getRandomMonster()
    this.setState({
      monster: newMonster,
    })
    await this.updateFromState(await helloMonster(newMonster))
    this.setIsLoading(false)
    this.resumePolling()
  }

  async endGame() {
    if (this.gameIsEnding) return
    this.gameIsEnding = true
    this.stopPolling()

    if (this.state.player1) {
      this.state.player1.points += 50
      await updateCharacter(this.state.player1)
    }

    if (this.state.player2) {
      this.state.player2.points += 50
      await updateCharacter(this.state.player2)
    }

    console.log('WHOA!')
    this.setState({
      description: 'Game Over! New game in 5 seconds...',
    })

    setTimeout(this.newGame.bind(this), TIME_TO_RESTART)
  }

  async resumePolling() {
    this.stopPolling()
    this.pollTimer = setInterval(async () => {
      if (this.gameIsEnding) return
      // check if monster has been hit, and display
      const {canAttack, gameState} = await poll(this.state.monster.id)
      this.updateFromState(gameState)

      if (canAttack && this.playersInGame()) {

        // Choose a random player to attack
        let playerToAttack
        if (this.state.player1 && !this.state.player2) {
          playerToAttack = this.state.player1
        }
        else if (this.state.player2 && !this.state.player1) {
          playerToAttack = this.state.player2
        } else {
          playerToAttack = Math.random() > 0.5 ? this.state.player1 : this.state.player2
        }

        const dmg = calculateDamage(this.state.monster)
        this.updateFromState(await attack(playerToAttack.id, this.state.monster.id, dmg))
      }
    }, POLL_INTERVAL)
  }

  stopPolling() {
    console.log('this.stopPolling()')
    clearInterval(this.pollTimer)
  }

  render() {
    if (this.state.isLoading) {
      return <div className='description-text'>loading</div>
    }
    // <BattleText attacker={this.state.monster} defender={this.state.player1} attack={'Axe Slash'}/>
    return (
      <div className='forest-monster-container'>
        <PlayerCard side={'left'} status={''} player={this.state.player1}/>
        <PlayerCard side={'right'} status={''} player={this.state.player2}/>
        <MonsterCard status={''} monster={this.state.monster}/>
        <div className='description-text'>
          {this.state.description}
        </div>
      </div>
    )
  }

}

export default ForestMonster
