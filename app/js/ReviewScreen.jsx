import React from 'react'
import Spinner from 'react-spinkit'
import 'whatwg-fetch'

import { STATS, MAX_LEVEL } from './Game.jsx'

import '../less/ReviewScreen.less'

// Milliseconds before the character creator will return to the home screen.
const RESTART_TIMER = 30000
const API_BASE = 'http://api.ExileFromMorewood.com'

class ReviewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
    this.createCharacter();
  }

  createCharacter() {
    return fetch(API_BASE + '/characters/create', {
      method: 'POST',
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({data: String(Math.random())}), // TODO: Scan data
    })
    .then(data => data.json() )
    .then(response => {
      this.props.character.num = response.num
      this.props.setCharacter(this.props.character)
      this.setState({loaded: true})
      setTimeout(() => this.props.restart(), RESTART_TIMER)
    })
    .catch(err => {
      console.log('parsing failed', err)
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
        <div className='review-start-over' onClick={this.props.restart.bind(this)}>
          <img src='static/img/start-over.svg'/>
          <div>Start Over</div>
        </div>
        <div className='review-url'>ExileFromMorewood.com</div>
      </div>
    )
  }
}

export default ReviewScreen
