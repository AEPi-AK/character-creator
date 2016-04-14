import React from 'react'

import '../less/MonsterCard.less'

class MonsterCard extends React.Component {

  render() {
      return (
        <div className='monster-card-container'>
          <div className='status'>{this.props.status}</div>
          <div className='img-container'>
            <img src={`static/img/${this.props.monster.race}.png`}/>
          </div>
          <div className='level'>Level 9</div>
        </div>
      )
    }
}

export default MonsterCard
