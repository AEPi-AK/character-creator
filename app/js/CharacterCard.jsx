import React from 'react'

import { STATS, MAX_LEVEL } from './Game.jsx'

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
    return (
      <div className='character-card'>
        <div className='character-card-title'>{this.props.character.race}</div>
        <div className='character-card-stat-label-container'>
          {labels}
          <div className='character-card-stat-label'>XP points</div>
        </div>
        <div className='character-card-stat-value-container'>
          {values}
          <div className='character-card-stat-value'>0</div>
        </div>
        <div className='character-card-avatar'>
          <img src={`static/img/${this.props.character.race}.png`}/>
          <div>Level: 1 of {MAX_LEVEL}</div>
        </div>
      </div>
    )
  }

}
export default CharacterScreen
