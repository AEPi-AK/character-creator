import React from 'react'
import ReactDOM from 'react-dom'

import SplashScreen from './SplashScreen.jsx'
import ScanScreen from './ScanScreen.jsx'
import CreateScreen from './CreateScreen.jsx'
import RaceScreen from './RaceScreen.jsx'
import StatsScreen from './StatsScreen.jsx'
import ReviewScreen from './ReviewScreen.jsx'

import '../less/Main.less'

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState = {
      screen: 0,
      character: {
        id: null,
        race: null,
        strength: 0,
        wisdom: 0,
        dexterity: 0,
        experience: 0,
        num: 0,
      }
    }

    this.screens = [
      SplashScreen,
      ScanScreen,
      CreateScreen,
      RaceScreen,
      StatsScreen,
      ReviewScreen,
    ]
  }

  advanceScreen(index) {
    if (typeof index === 'number') {
      this.setState({screen: index})
    } else {
      this.setState({screen: this.state.screen + 1})
    }
  }

  setCharacter(character) {
    this.setState({character});
  }

  restart() {
    this.setState(this.initialState);
  }

  render() {
    const screens = this.screens.map(screen => {
      const Screen = React.createFactory(screen)
      return Screen({
        restart: this.restart.bind(this),
        advanceScreen: this.advanceScreen.bind(this),
        setCharacter: this.setCharacter.bind(this),
        character: this.state.character,
      })
    })
    return (
      <div className='screen'>
        {screens[this.state.screen]}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
