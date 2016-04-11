import React from 'react'

import '../less/RaceScreen.less'

class RaceScreen extends React.Component {

  constructor(props) {
    super(props);
    this.races = ['Human', 'Dwarf', 'Elf'];
    this.state = {
      race: null,
    }
  }

  render() {
      const races = this.races.map((name, i) => {
        return (
          <div className='race-card' key={i} onClick={this.props.updateRace.bind(this, name)}>
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
