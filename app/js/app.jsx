import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

import '../less/app.less'

class Cube extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      face: 12,
      rolled: false,
    }
  }

  roll() {
    this.setState({face: Math.floor(Math.random() * 20) + 1});
    setTimeout(() => {
      this.setState({rolled: true})
      this.refs.value.className += ' zoomIn';
    }, 1000)
  }

  render() {
    const classes = classnames(`cube show-${this.state.face} scaled`)
    const style = {
      position: 'absolute',
      left: `${this.props.leftOffset}px`,
      top: '0px'
    }
    return (
      <div style={style}>
        <div className='cube-container'>
          <div ref='cube' className={classes}>
            <figure className='face01'>1</figure>
            <figure className='face02'>2</figure>
            <figure className='face03'>3</figure>
            <figure className='face04'>4</figure>
            <figure className='face05'>5</figure>
            <figure className='face06'>6</figure>
            <figure className='face07'>7</figure>
            <figure className='face08'>8</figure>
            <figure className='face09'>9</figure>
            <figure className='face10'>10</figure>
            <figure className='face11'>11</figure>
            <figure className='face12'>12</figure>
            <figure className='face13'>13</figure>
            <figure className='face14'>14</figure>
            <figure className='face15'>15</figure>
            <figure className='face16'>16</figure>
            <figure className='face17'>17</figure>
            <figure className='face18'>18</figure>
            <figure className='face19'>19</figure>
            <figure className='face20'>20</figure>
          </div>
        </div>
        <div className='name'>{this.props.name}</div>
        <div ref='value' className='value'>{this.state.rolled ? this.state.face : ''}</div>
      </div>
    )
  }
}

class StatsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.cubes = ['strength', 'wisdom', 'dexterity'];
    this.state = {
      rolled: false,
      rolling: false,
    }
  }

  rollAll() {
    this.cubes.map((name, i) => {
      setTimeout(() => this.refs['cube' + i].roll(), 1500 * i)
    })
    this.setState({rolled: true, rolling: true});
    setTimeout(() => this.setState({rolling: false}), 1500 * this.cubes.length)
  }

  onClick() {
    if (this.state.rolled && !this.state.rolling) {
      this.props.advanceScreen();
    }
    else if (this.state.rolled && this.state.rolling) {
      console.log('already rolling...')
    }
    else {
      this.rollAll();
    }
  }

  render() {
    const cubes = this.cubes.map((name, i) => {
      return <Cube key={i} ref={'cube' + i} leftOffset={250 * i} name={name}/>
    })
    let titleText;
    if (this.state.rolled && !this.state.rolling) {
      titleText = 'Tap To Continue'
      this.refs.title.className += ' pulsate';
    }
    else if (this.state.rolled && this.state.rolling) {
      titleText = 'Rolling...'
    } else {
      titleText = 'Tap To Roll For Stats'
    }
    const readyForNextScreen = this.state.rolled && !this.state.rolling;
    return (
      <div onClick={this.onClick.bind(this)}>
        <div ref='title' className='title'>{titleText}</div>
        {cubes}
      </div>
    )
  }

}

class StartScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.advanceScreen}>
        <div className='pretitle'>&Alpha;&Epsilon;&Pi; Presents:</div>
        <img className='logo' src='static/img/dnd_logo_transparent.png'/>
        <div className='subtitle'>Exile from Morewood</div>
        <div className='cta pulsate'>tap card to begin</div>
      </div>
    )
  }

}

class SecondScreen extends React.Component {

  render() {
    return (
      <div onClick={this.props.advanceScreen}>
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

    this.screens = [
      StartScreen,
      StatsScreen,
    ]
  }

  advanceScreen() {
    this.setState({screen: this.state.screen + 1})
  }

  render() {
    const screens = this.screens.map(screen => {
      const Screen = React.createFactory(screen);
      return Screen({advanceScreen: this.advanceScreen.bind(this)})
    })
    return (
      <div className='container'>
        {screens[this.state.screen]}
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
