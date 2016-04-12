import React from 'react'
import classNames from 'classnames'
import { STATS, rollDie } from './Game.jsx'

import '../less/StatsScreen.less'

class Cube extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      face: 20,
      rolled: false,
    }
  }

  roll() {
    this.setState({face: rollDie()});
    setTimeout(() => {
      this.setState({rolled: true})
      this.refs.value.className += ' zoomIn';
    }, 1000)
  }

  render() {
    const style = {
      position: 'absolute',
      left: `${this.props.leftOffset}px`,
      top: '0px'
    }
    return (
      <div style={style}>
        <div className='cube-container'>
          <div ref='cube' className={`cube show-${this.state.face} scaled`}>
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
    this.state = {
      rolled: false,
      rolling: false,
    }
  }

  rollAll() {
    STATS.map((stat, i) => {
      setTimeout(() => this.refs['cube' + i].roll(), 1500 * i)
    })
    this.setState({rolled: true, rolling: true});
    setTimeout(() => this.setState({rolling: false}), 1500 * STATS.length)
  }

  onClick() {
    if (this.state.rolled && !this.state.rolling) {
      this.props.character.strength = this.refs.cube0.state.face;
      this.props.character.wisdom = this.refs.cube1.state.face;
      this.props.character.dexterity = this.refs.cube2.state.face;
      this.props.setCharacter(this.props.character);
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
    const cubes = STATS.map((stat, i) => {
      return <Cube key={i} ref={'cube' + i} leftOffset={250 * i} name={stat}/>
    })
    let titleText;
    let cta = false;
    if (this.state.rolled && !this.state.rolling) {
      titleText = 'Tap To Continue'
      cta = true;
    }
    else if (this.state.rolled && this.state.rolling) {
      titleText = 'Rolling...'
    } else {
      titleText = 'Tap To Roll For Stats'
      cta = true;
    }
    const classes = classNames('stats-title', {cta})
    const readyForNextScreen = this.state.rolled && !this.state.rolling;
    return (
      <div onClick={this.onClick.bind(this)}>
        <div ref='title' className={classes}>{titleText}</div>
        {cubes}
      </div>
    )
  }

}

export default StatsScreen
