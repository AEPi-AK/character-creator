import React from 'react'

import { RACES } from './Game.jsx'

import '../less/RaceScreen.less'

class RaceScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      race: null,
    }
  }

  setRace(name) {
    this.props.character.race = name;
    this.props.setCharacter(this.props.character);
    this.props.advanceScreen();
  }

  render() {
      const races = RACES.map((name, i) => {
        return (
          <div className='race-card' key={i} onClick={this.setRace.bind(this, name)}>
            <img src={`static/img/${name}.png`}/>
            <div>{name}</div>
          </div>
        )
      })
      return (
        <div className='race-container'>
          <div className='race-title'>Choose a Race</div>
          {races}
        </div>
      )
    }
}

export default RaceScreen
