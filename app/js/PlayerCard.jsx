import React from 'react'
import classNames from 'classnames'

import '../less/PlayerCard.less'

class PlayerCard extends React.Component {

  render() {
    const player = this.props.player
    const sideClass = `side-${this.props.side}`
    if (!player) {
      return <div className={`player-card-container empty ${sideClass}`}/>
    }
    const classes = classNames(
      'player-card-container',
      sideClass,
      {dragonslayer: player.isDragonSlayer},
    )
    return (
      <div className={classes}>
        <div className='status'>{this.props.status}</div>
        <div className='img-container'>
          <img src={`static/img/${player.race}.png`}/>
        </div>
        <div className='exp'>{player.points} exp</div>
        <div className='level'>Level {player.level}</div>
      </div>
    )
    }
}

export default PlayerCard
