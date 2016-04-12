import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-spinkit'

import SplashScreen from './SplashScreen.jsx'
import ScanScreen from './ScanScreen.jsx'
import CreateScreen from './CreateScreen.jsx'
import RaceScreen from './RaceScreen.jsx'
import StatsScreen from './StatsScreen.jsx'
import ReviewScreen from './ReviewScreen.jsx'
import FinishScreen from './FinishScreen.jsx'

import '../less/Main.less'

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState = {
      screen: 0,
      isLoading: false,
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
      FinishScreen,
    ].map(component => React.createFactory(component))
  }

  advanceScreen(index) {
    if (typeof index === 'number') {
      this.setState({screen: index})
    } else {
      this.setState({screen: this.state.screen + 1})
    }
  }

  restart() {
    this.setState(this.initialState);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className='screen-loading'>
          <Spinner noFadeIn={true} spinnerName='circle'/>
        </div>
      )
    }
    const screens = this.screens.map(screen => screen({
      restart: this.restart.bind(this),
      advanceScreen: this.advanceScreen.bind(this),
      setCharacter: character => this.setState({character}),
      setIsLoading: isLoading => this.setState({isLoading}),
      character: this.state.character,
    }))
    return (
      <div className='screen'>
        {screens[this.state.screen]}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
