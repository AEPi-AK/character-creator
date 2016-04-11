import React from 'react'

import '../less/CreateScreen.less'

class CreateScreen extends React.Component {

  render() {
    return (
      <div>
        <div className='create-title'>As you journey through <span>Exile from Morewood</span>, <br />our booth will save your skills and experience.</div>
        <div className='create-button' onClick={this.props.advanceScreen}>
          <img src='static/img/new.svg'></img>
          <div>Create Character</div>
        </div>
        <div className='create-random-button' onClick={this.props.advanceScreen}>
          <img src='static/img/shuffle.svg'></img>
          <div>randomize</div>
        </div>
      </div>
    )
  }

}

export default CreateScreen
