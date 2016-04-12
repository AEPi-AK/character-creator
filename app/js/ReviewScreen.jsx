import React from 'react'
import Spinner from 'react-spinkit'
import 'whatwg-fetch'

import CharacterCard from './CharacterCard.jsx'
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
