import React from 'react'
import Spinner from 'react-spinkit'
import 'whatwg-fetch'

import { createCharacter, STATS, MAX_LEVEL } from './Game.jsx'

import '../less/ReviewScreen.less'

class ReviewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }

    createCharacter(this.props.character, (err, character) => {
      this.setState({loaded: true})
    })
  }


  render() {
    const labels = STATS.map((stat, i) => {
      return (
        <div key={i} className='review-card-stat-label'>{stat}</div>
      )
    })
    const values = STATS.map((stat, i) => {
      return (
        <div key={i} className='review-card-stat-value'>{this.props.character[stat]}/20</div>
      )
    })
    if (!this.state.loaded) {
      return (
        <div className='review-loading'>
          <Spinner noFadeIn={true} spinnerName='circle'/>
        </div>
      )
    }
    return (
      <div className='review-container'>
        <div className='title'>Your Character</div>
        <div className='review-card'>
          <div className='review-card-title'>{this.props.character.race}</div>
          <div className='review-card-stat-label-container'>
            {labels}
            <div className='review-card-stat-label'>XP points</div>
          </div>
          <div className='review-card-stat-value-container'>
            {values}
            <div className='review-card-stat-value'>0</div>
          </div>
          <div className='review-card-avatar'>
            <img src={`static/img/${this.props.character.race}.png`}/>
            <div>Level: 1 of {MAX_LEVEL}</div>
          </div>
        </div>
        <div className='review-player-no'>
          <div className='review-player-no-label'>Player No. {this.props.character.num}</div>
          <div className='review-player-no-help'>Write this number down to track your progress & view the leaderboard online!</div>
        </div>
        <div className='review-finish' onClick={this.props.restart.bind(this)}>
          <img src='static/img/finish.svg'/>
          <div>Finish</div>
        </div>
        <div className='review-url'>ExileFromMorewood.com</div>
      </div>
    )
  }
}

export default ReviewScreen
