import React from 'react'

import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'
import CreateScreen from './CreateScreen.jsx'
import RaceScreen from './RaceScreen.jsx'
import StatsScreen from './StatsScreen.jsx'
import ReviewScreen from './ReviewScreen.jsx'
import FinishScreen from './FinishScreen.jsx'
import ProfileScreen from './ProfileScreen.jsx'
import LoadingScreen from '../LoadingScreen.jsx'

import './Tavern.less'

class Tavern extends React.Component {

  constructor(props) {
    super(props)

    this.state = this.initialState = {
      screen: 0,
      isLoading: false,
      character: {
        id: null,
        points: 0,
        number: 0,
        race: null,
        strength: 0,
        wisdom: 0,
        dexterity: 0,
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
      ProfileScreen,
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
    console.log('restarting')
    this.setState(this.initialState)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className='screen'>
          <LoadingScreen onTryAgain={this.restart.bind(this)}/>
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

export default Tavern
