import React from 'react'

import '../less/MonsterCard.less'

class MonsterCard extends React.Component {

  render() {
      return (
        <div className='monster-card-container'>
          <div className='status'>attacking</div>
          <img src={`static/img/gnoll.png`}/>
          <div className='level'>Level 9</div>
        </div>
      )
    }
}

export default MonsterCard
