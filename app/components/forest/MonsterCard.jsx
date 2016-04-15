import React from 'react'

import HealthBar from './HealthBar.jsx'

import './MonsterCard.less'

class MonsterCard extends React.Component {

  render() {
    const monster = this.props.monster
    return (
      <div className='monster-card-container'>
        <div className='name'>{monster.name}</div>
        <div className='status'>{this.props.status}</div>
        <div className='img-container'>
          <img src={`static/img/${monster.id}.png`}/>
        </div>
        <div className='level'>Level {monster.level}</div>
        <HealthBar color={monster.color} current={monster.hp} total={monster.hp_max} barSize='monster'/>
      </div>
    )
  }

}

export default MonsterCard
