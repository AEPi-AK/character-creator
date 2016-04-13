import React from 'react'

import { STATS, RACES, rollDie } from './Game.jsx'

import '../less/CreateScreen.less'

class CreateScreen extends React.Component {

  randomize() {
    // Generate random stats
    STATS.forEach(stat => {
      this.props.character[stat] = rollDie()
    })
    // Generate random race
    const randomSelection = a => a[Math.floor((Math.random() * 10)) % a.length]
    this.props.character.race = randomSelection(RACES)
    // Skip to the review screen
    this.props.advanceScreen(5)
  }

  render() {
    return (
      <div className='create-container'>
        <div className='header'>As you journey through <em>Exile from Morewood</em>, <br />our booth will save your skills and experience.</div>
        <div className='create-button' onClick={this.props.advanceScreen}>
          <img src='static/img/new.svg'></img>
          <div>Create Character</div>
        </div>
        <div className='random-button' onClick={this.randomize.bind(this)}>
          <img src='static/img/shuffle.svg'></img>
          <div>randomize</div>
        </div>
      </div>
    )
  }

}

export default CreateScreen
