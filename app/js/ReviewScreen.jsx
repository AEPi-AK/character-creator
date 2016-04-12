import React from 'react'

import CharacterCard from './CharacterCard.jsx'
import { createCharacter, STATS, MAX_LEVEL } from './Game.jsx'

import '../less/ReviewScreen.less'

class ReviewScreen extends React.Component {

  async componentWillMount() {
    this.props.setIsLoading(true)
    const character = await createCharacter(this.props.character)
    this.props.setCharacter(character)
  }

  render() {
    return (
      <div className='review-container'>
        <div className='title'>Your Character</div>
        <CharacterCard character={this.props.character}/>
        <div className='review-player-no'>
          <div className='review-player-no-label'>Player No. {this.props.character.num}</div>
          <div className='review-player-no-help'>Write this number down to track your progress & view the leaderboard online!</div>
        </div>
        <div className='review-finish' onClick={this.props.advanceScreen}>
          <div>Continue</div>
        </div>
        <div className='review-url'>ExileFromMorewood.com</div>
      </div>
    )
  }
}

export default ReviewScreen
