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
        monsterHP: 20,
        monsterName: 'spoopy monster',
        attackDamage: 20,
      }
    }

    //update monster HP
    //if new monster HP <= 0: redirects to "you killed the monster" screen
    //if new monster HP > 0: redirects back to choose attack screen

    attackHappened() {
      console.debug(this.state)
      console.debug(`old HP: ${this.state.monsterHP}`)
      this.setState({monsterHP: this.state.monsterHP-this.state.attackDamage})
      console.debug(`new HP: ${this.state.monsterHP}`)

      if (this.state.monsterHP<=0) {
        this.props.setScreen(4)
      }
      else {
        this.props.setScreen(2)
      }
    }

    componentDidMount() {
      console.debug(this.state)
      setTimeout(() => {
        this.attackHappened()
      }, 1000)
    }

    render() {
        return (
            <div className='container'>
                <div className='attacking-text'>attacking spookie moonster</div>
            </div>
        )
    }
}

export default AttackingScreen
