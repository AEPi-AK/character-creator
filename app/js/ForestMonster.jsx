import React from 'react'

import PlayerCard from './PlayerCard.jsx'
import MonsterCard from './MonsterCard.jsx'
import { calculateLevel } from './Game.jsx'

import '../less/ForestMonster.less'

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

  render() {
    const player1 = {
      race: 'Human',
      name: 'Player 98',
      hp: 49,
      hp_max: 110,
      level: calculateLevel(15),
      points: 15,
      color: 'yellow',
      isDragonSlayer: false,
    }
    const player2 = {
      race: 'Elf',
      name: 'Player 33',
      hp: 49,
      hp_max: 300,
      level: calculateLevel(999),
      points: 999,
      color: 'yellow',
      isDragonSlayer: true,
    }
    const monster = {
      race: 'gnoll',
      name: 'Forest Gnoll',
      hp: 330,
      hp_max: 500,
      level: 9,
      color: 'green-light',
    }
        // <PlayerCard side={'left'} status={'attacking'} player={player1}/>
    return (
      <div className='forest-monster-container'>
         <PlayerCard side={'left'} status={'attacking'} player={player1}/>
        <PlayerCard side={'right'}/>
        <MonsterCard status={'defending'} monster={monster}/>
        <BattleText attacker={monster} defender={player1} attack={'Axe Slash'}/>
      </div>
    )
    }
}

export default ForestMonster
