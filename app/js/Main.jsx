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
    this.state = {
      screen: 0,
      race: null,
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

  advanceScreen() {
    this.setState({screen: this.state.screen + 1})
  }

  updateRace(newRace) {
    this.setState({screen: this.state.screen + 1, race: newRace})
  }

  render() {
    const screens = this.screens.map(screen => {
      const Screen = React.createFactory(screen);
      return Screen({advanceScreen: this.advanceScreen.bind(this),
        updateRace:this.updateRace.bind(this)})
    })
    return (
      <div className='screen'>
        {screens[this.state.screen]}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
