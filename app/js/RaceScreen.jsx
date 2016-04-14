import React from 'react'

import { RACES } from './Character.jsx'

import '../less/RaceScreen.less'

class RaceScreen extends React.Component {

  setRace(name) {
    this.props.character.race = name
    this.props.setCharacter(this.props.character)
    this.props.advanceScreen()
  }

  render() {
      return (
        <div className='race-container'>
          <div className='title'>Choose a Race</div>
          {RACES.map((name, i) => (
            <div className='card' key={i} onClick={this.setRace.bind(this, name)}>
              <img src={`static/img/${name}.png`}/>
              <div>{name}</div>
            </div>
            )
          )}
        </div>
      )
    }
}

export default RaceScreen
