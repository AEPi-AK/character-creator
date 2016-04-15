import React from 'react'
import classNames from 'classnames'

import './HealthBar.less'

class HealthBar extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      width: null,
      monsterWidth: 741,
      playerWidth: 376,
    }
  }

  calculateBarWidth() {
    const percentHP = (this.props.current/this.props.total)
    if (this.props.barSize=='monster'){
      this.state.width = this.state.monsterWidth
      return (this.state.monsterWidth*percentHP)
    }
    this.state.width = this.state.playerWidth
    return (this.state.playerWidth*percentHP)
  }

  render() {
    const barWidth = this.calculateBarWidth()
    return (
      <div className={`health-bar-container color-${this.props.color}`}>
        <div className='health-bar-outside' style={{width: this.state.width}}>
          <div className='health-bar' style={{width: barWidth}}>
          </div>
        </div>
        <div className='health-bar-text'>
          {this.props.current}/{this.props.total} hp
        </div>
      </div>
    )
    }
}

export default HealthBar
