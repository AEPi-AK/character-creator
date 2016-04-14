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
import ProfileScreen from './ProfileScreen.jsx'

import '../less/Main.less'

class Main extends React.Component {

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
    this.setState(this.initialState)
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className='screen-loading'>
          <Spinner noFadeIn={true} spinnerName='circle'/>
          <div className='button loading-restart' onClick={this.restart.bind(this)}>
            <div>Try Again?</div>
          </div>
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

window.console.log = (str, ...strs) => {
  const msg = str + strs.join(' ')
  const node = window.document.getElementById('debug-console')
  node.scrollTop = node.scrollHeight;
  node.innerHTML += (msg + '\n')
  console.debug(msg)
}

window.IS_ELECTRON = window.location.search.includes('electron')
window.API_BASE = 'http://api.ExileFromMorewood.com'
if (!window.IS_ELECTRON) {
  window.API_BASE = 'http://localhost:8000'
}
console.log('IS_ELECTRON = ', window.IS_ELECTRON)
console.log('API_BASE = ', window.API_BASE)


document.getElementById('debug-console').addEventListener('click', event => {
  const node = event.target
  if (!node.hasOwnProperty('isaacsucks')) {
    node.isaacsucks = {
      timer: null,
      counter: 0,
    }
  }
  clearTimeout(node.isaacsucks.timer)
  node.isaacsucks.counter += 1
  node.isaacsucks.timer = setTimeout(() => {
    node.isaacsucks.counter = 0
  }, 750)
  if (node.isaacsucks.counter >= 7) {
    if (event.clientX >= 250) {
      return window.location.reload()
    }
    if (window.DEBUG_MODE === true) {
      console.log('debug mode disabled')
      window.DEBUG_MODE = false
      window.console.log = window.old_log
      node.style.opacity = 0
      return
    }
    console.log('debug mode enabled')
    window.DEBUG_MODE = true
    window.old_log = window.console.log
    node.style.opacity = 1
  }
})

ReactDOM.render(<Main/>, document.getElementById('root'))
