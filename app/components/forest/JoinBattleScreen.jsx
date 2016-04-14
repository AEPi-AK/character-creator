import React from 'react'

import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import './JoinBattleScreen.less'

class NoPlayerCard extends React.Component {

    render() {
        return (
            <div className='no-player-card'>
                <div className='join-text'>join battle</div>
            </div>
        )
    }
}

class PlayerCard extends React.Component {

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

  render() {
      const monster = {
        name: 'Forest Gnoll',
        race: 'gnoll',
      }

      var numPlayers = 1;

      var forestTitle = `ready to fight`
      var playerCardRight = <NoPlayerCard/>
      var playerCardLeft = <NoPlayerCard/>

      if (numPlayers>=1) {
        playerCardLeft = <PlayerCard player={this.props.player}/>
        forestTitle = "active battle"
      }

      if (numPlayers==2) {
        playerCardRight = <PlayerCard player={this.props.player}/>
        forestTitle = "active battle"
      }

      return (
        <div className='forest-player-container'>
            <div className='forest-title'>{forestTitle}</div>
            <div className='card-container'>
                {playerCardLeft}
                <div className='monster-card'>
                    <img src={`static/img/${monster.race}.png`}/>
                    <div className='monster-name'>{monster.name}</div>
                </div>
                {playerCardRight}
            </div>
        </div>
      )
    }
}

export default JoinBattleScreen
