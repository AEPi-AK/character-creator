import React from 'react'
import Spinner from 'react-spinkit'
import 'whatwg-fetch'

import { STATS } from './Game.jsx'

import '../less/ReviewScreen.less'

const SERVER_BASE = 'http://localhost:8000' || 'http://api.ExileFromMorewood.com'

class ReviewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
    this.createCharacter();
  }

  createCharacter() {
    return fetch(SERVER_BASE + '/characters/create', {
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
      <div>
        <div className='title'>Your Character</div>
        <div className='review-card'>
          <div className='review-card-title'>{this.props.character.race}</div>
          <div className='review-card-stat-label-container'>
            {labels}
          </div>
          <div className='review-card-stat-value-container'>
            {values}
          </div>
          <div className='review-card-avatar'>
            <img src={`static/img/${this.props.character.race}.png`}/>
            <div>Level: 1 of 3</div>
          </div>
        </div>
        <div className='review-player-no'>
          <div className='review-player-no-label'>Player No. {this.props.character.num}</div>
          <div className='review-player-no-help'>Write this number down to track your progress & view the leaderboard online!</div>
        </div>
        <div className='review-url'>ExileFromMorewood.com</div>
      </div>
    )
  }
}

export default ReviewScreen
