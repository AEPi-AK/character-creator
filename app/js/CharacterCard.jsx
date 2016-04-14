import React from 'react'
import classNames from 'classnames'

import { calculateLevel, STATS, DRAGONSLAYER_LEVEL, MAX_LEVEL } from './Character.jsx'

import '../less/CharacterCard.less'

class CharacterScreen extends React.Component {

  render() {
    const labels = STATS.map((stat, i) => {
      return (
        <div key={i} className='review-card-stat-label'>{stat}</div>
      )
    })
    const values = STATS.map((stat, i) => {
      return ( <div key={i} className='review-card-stat-value'>{this.props.character[stat]}/20</div>
      )
    })
    const characterLevel = calculateLevel(this.props.character.points)
    const isDragonSlayer = this.props.character.pro_id
    const classes = classNames('character-card',
      {'character-card-dragonslayer': isDragonSlayer
    })
    return (
      <div className={classes}>
        <div className='character-card-title'>{this.props.character.race}</div>
        {
          isDragonSlayer ?
            <img className='icon' src='static/img/dragon.svg'/>
          :
          null
        }
        <div className='character-card-stat-label-container'>
          {labels}
          <div className='character-card-stat-label'>Exp points</div>
        </div>
        <div className='character-card-stat-value-container'>
          {values}
          <div className='character-card-stat-value'>{this.props.character.points}</div>
        </div>
        <div className='character-card-avatar'>
          <img src={`static/img/${this.props.character.race}.png`}/>
          <div>Level: {characterLevel} of {MAX_LEVEL}</div>
        </div>
      </div>
    )
  }

}
export default CharacterScreen
