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
                <img src={this.props.player.picture}/>
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

      const firstPlayer = {
        name: 'Jordan',
        picture: './static/img/Human.png',
        
      }

      const secondPlayer = {
        name: 'Avi',
        picture: './static/img/Elf.png',
      }

      var forestTitle = `ready to fight`
      var playerCardRight = <NoPlayerCard/>
      var playerCardLeft = <NoPlayerCard/>

      if (numPlayers>=1) {
        playerCardRight = <PlayerCard player={firstPlayer}/>
        forestTitle = "active battle"
      }

      if (numPlayers==2) {
        playerCardLeft = <PlayerCard player={secondPlayer}/>
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
