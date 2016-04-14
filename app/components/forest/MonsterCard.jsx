import React from 'react'

import HealthBar from './HealthBar.jsx'

import './MonsterCard.less'

class MonsterCard extends React.Component {

  render() {
    const monster = this.props.monster
    return (
      <div className='monster-card-container'>
        <div className='name'>{monster.race}</div>
        <div className='status'>{this.props.status}</div>
        <div className='img-container'>
          <img src={`static/img/${monster.race}.png`}/>
        </div>
        <div className='level'>Level {monster.level}</div>
        <HealthBar color={monster.color} current={monster.hp} total={monster.hp_max}/>
      </div>
    )
    }
}

export default MonsterCard
