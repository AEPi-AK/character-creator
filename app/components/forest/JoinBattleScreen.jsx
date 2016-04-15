import React from 'react'

import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import './JoinBattleScreen.less'
import { getRandomMonster } from './Game.jsx'

class NoPlayerMiniCard extends React.Component {

    render() {
        return (
            <div className='no-player-card'>
                <div className='join-text' onClick={this.props.onClick}>join battle</div>
            </div>
        )
    }
}

class PlayerMiniCard extends React.Component {

    render() {
        return (
            <div className='player-card'>
                <img src={`static/img/${this.props.player.race}.png`}/>
                <div className='player-name'>{this.props.player.name}</div>
            </div>
        )
    }
}

class JoinBattleScreen extends React.Component {

  onJoin() {
    console.log('joining battle!')
    this.props.setScreen(2)
  }

  render() {
    let forestTitle = 'ready to fight'
    let playerCardRight = <NoPlayerMiniCard onClick={this.onJoin.bind(this)}/>
    let playerCardLeft = <NoPlayerMiniCard onClick={this.onJoin.bind(this)}/>

    // TODO: Put this on the correct side
    if (this.props.player1) {
      playerCardLeft = <PlayerMiniCard player={this.props.player1}/>
      forestTitle = 'active battle'
    }

    if (this.props.player2) {
      playerCardRight = <PlayerMiniCard player={this.props.player2}/>
      forestTitle = 'active battle'
    }

    console.log(this.props.monster)

    return (
      <div className='forest-player-container'>
        <div className='forest-title'>{forestTitle}</div>
        <div className='card-container'>
          {playerCardLeft}
          <div className='monster-card'>
            <img src={`static/img/${this.props.monster.id}.png`}/>
            <div className='monster-name'>{this.props.monster.name}</div>
          </div>
          {playerCardRight}
        </div>
      </div>
    )
  }

}

export default JoinBattleScreen
