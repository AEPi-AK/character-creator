import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'

import './AttackingScreen.less'

//requires the name of the monster that's attacking
//requires the monster's HP,
//requires how much HP damage the attack did

//ensures that monster HP prop is updated to reflect attack.
//(this should be actually updated in the game state)
  //if new monster HP <= 0: redirects to "you killed the monster" screen
  //if new monster HP >= 0: redirects back to choose attack screen

//advances to next screen after 1000 ms

class AttackingScreen extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        monster: null,
      }
    }

    render() {
      return (
        <div className='container'>
          <div className='attacking-text'>attacking {this.props.monster.name}</div>
        </div>
      )
    }
}

export default AttackingScreen
