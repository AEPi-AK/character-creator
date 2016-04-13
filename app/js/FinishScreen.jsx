import React from 'react'

import '../less/FinishScreen.less'

class FinishScreen extends React.Component {

  render() {
    const panels = [
      {
        title: "do battle",
        subtitle: "as you journey through the booth",
        icon: "swords-yellow.svg",
      },
      {
        title: "level up",
        subtitle: "as you gain experience points",
        icon: "levelup-yellow.svg",
      },
      {
        title: "return here",
        subtitle: "to track your progress",
        icon: "return-yellow.svg",
      },
    ].map(({title, subtitle, icon}, i) => (
      <div className='panel-card' key={i}>
        <div className='panel-title'>{title}</div>
        <div className='panel-subtitle'>{subtitle}</div>
        <div className='panel-icon'>
          <img src={`static/img/${icon}`}/>
        </div>
      </div>
    ))

    return (
      <div className='container'>
        <div className='title'>Adventure Awaits</div>
        {panels}
        <div className='finish-button' onClick={this.props.restart.bind(this)}>
          <div>Finish</div>
        </div>
      </div>
    )
  }

}

export default FinishScreen
