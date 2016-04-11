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
      scanData: '',
      character: {
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

  onKeyUp(e) {
    if (e.keyCode == 13) {
      const scanner = ReactDOM.findDOMNode(this.refs.scanner)
      this.setState({scanData: scanner.value})
      scanner.value = ''
    }
  }

  onBlur() {
    console.log('blur')
    this.refs.scanner.focus()
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
        <input
          type='text'
          ref='scanner'
          onKeyUp={this.onKeyUp.bind(this)}
          autoFocus={true}
          onBlur={this.onBlur.bind(this)}
        />
        <h1>{this.state.scanData}</h1>
        {screens[this.state.screen]}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
