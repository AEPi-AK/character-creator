import React from 'react'

import CharacterCard from './CharacterCard.jsx'
import { createCharacter, STATS, MAX_LEVEL } from './Game.jsx'

import '../less/ReviewScreen.less'

class ReviewScreen extends React.Component {

  async componentDidMount() {
    // XXX: Prevents componentDidMount from being called twice in ReviewScreen
    // since it changes state.
    // See: http://stackoverflow.com/questions/28720769
    if (window.lock === undefined) {
      console.log('no-op')
      window.lock = true
      this.props.setIsLoading(true)
      const character = await createCharacter(this.props.character)
      this.props.setIsLoading(false)
      this.props.setCharacter(character)
    }

  }

  render() {
    return (
      <div className='review-container'>
        <div className='title'>Your Character</div>
        <CharacterCard character={this.props.character}/>
        <div className='player-number'>
          <div className='player-number-label'>Player No. {this.props.character.number}</div>
          <div className='player-number-help'>Write this number down to track your progress & view the leaderboard online!</div>
        </div>
        <div className='finish-button' onClick={this.props.advanceScreen}>
          <div>Continue</div>
        </div>
        <div className='url'>ExileFromMorewood.com</div>
      </div>
    )
  }
}

export default ReviewScreen
