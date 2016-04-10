import React from 'react'
import ReactDOM from 'react-dom'
import Spinner from 'react-spinkit'

import '../less/app.less'


class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state =  {}
  }

  render() {
    return (
      <div className='container'>
        <div className='pretitle'>AEPi Presents:</div>
        <img className='logo' src='/static/img/dnd_logo_transparent.png'/>
        <div className='subtitle'>Exile from Morewood</div>
        <div className='cta pulsate'>tap card to begin</div>
      </div>
    )
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
