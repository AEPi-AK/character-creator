import React from 'react'
import classNames from 'classnames'

import '../less/HealthBar.less'

class HealthBar extends React.Component {

  render() {
    return (
      <div className={`health-bar-container color-${this.props.color}`}>
        {this.props.current}/{this.props.total} hp
      </div>
    )
    }
}

export default HealthBar
