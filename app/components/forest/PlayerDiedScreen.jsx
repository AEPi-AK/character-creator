import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import './PlayerDiedScreen.less'

class PlayerDiedScreen extends React.Component {

    render() {
        return (
            <div className='container'>
                <div className='main-title'>You have been defeated</div>
                <div className='subtitle'>Better luck next time, adventurer!</div>
                <div className='new-battle-button' onClick={this.props.restart}>new battle</div>
            </div>
        )
    }
}

export default PlayerDiedScreen
