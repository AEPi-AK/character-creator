import React from 'react'

import '../less/ReviewScreen.less'

class ReviewScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
      return (
        <div>
          <div className='title'>Your Character</div>
          <div className='review-card'>
            <div className='review-card-title'>Dwarf</div>
            <div className='review-card-stat-label-container'>
              <div className='review-card-stat-label'>Strength</div>
              <div className='review-card-stat-label'>Wisdom</div>
              <div className='review-card-stat-label'>Dexterity</div>
            </div>
            <div className='review-card-stat-value-container'>
              <div className='review-card-stat-value'>15/20</div>
              <div className='review-card-stat-value'>9/20</div>
              <div className='review-card-stat-value'>18/20</div>
            </div>
            <div className='review-card-avatar'>
              <img src={`static/img/${'dwarf'}.png`}/>
              <div>Level: 1 of 3</div>
            </div>
          </div>
          <div className='review-player-no'>
            <div className='review-player-no-label'>Player No. 323</div>
            <div className='review-player-no-help'>Write this number down to track your progress & view the leaderboard online!</div>
          </div>
          <div className='review-url'>ExileFromMorewood.com</div>
        </div>
      )
    }
}

export default ReviewScreen
