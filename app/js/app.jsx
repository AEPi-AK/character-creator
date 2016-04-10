import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-spinkit'

import '../less/app.less'

// class CarolineButton extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state =  {counter:props.countStart}
//   }


//   greet(str) {
//     alert(`counter is ${this.state.counter}`);
//     this.setState({counter:this.state.counter+1})
//   }

//   render() {
//     return (
//       <button onClick={function(){
//         this.greet(this.props.name)
//       }.bind(this)
//       }>
//       hallo</button>
//     )
//   }
// }

class StartScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.onClick}>
        <div className='pretitle'>𝛢𝛦𝛱 Presents:</div>
        <img className='logo' src='/static/img/dnd_logo_transparent.png'/>
        <div className='subtitle'>Exile from Morewood</div>
        <div className='cta pulsate'>tap card to begin</div>
      </div>
    )
  }

}

class SecondScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.onClick}>
        {'Hi mom!'}
      </div>
    )
  }

}

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: 0,
    }

    this.SCREENS = [
      StartScreen,
      SecondScreen,
    ]
  }

  advanceScreen() {
    this.setState({screen: this.state.screen + 1})
  }

  render() {
    const screens = this.SCREENS.map(screen => {
      const Screen = React.createFactory(screen);
      return Screen({onClick: this.advanceScreen.bind(this)})
    })
    return (
      <div className='container'>
        {screens[this.state.screen]}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
