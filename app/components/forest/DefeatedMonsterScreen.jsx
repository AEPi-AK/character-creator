import React from 'react'
import SplashScreen from '../SplashScreen.jsx'
import ScanScreen from '../ScanScreen.jsx'
import CharacterCard from '../CharacterCard.jsx'

import { DRAGONSLAYER_LEVEL, calculateLevel, calculateHp, calculateDamage, getCharacter, updateCharacter } from '../Character.jsx'

//requires how many experience points the player gained
//requires all information about the player to display in a player card

//todo: "new battle" button that redirects to splash screen

class DefeatedMonsterScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          character: {
            race: 'Dwarf',
            strength: 15,
            wisdom: 20,
            dexterity: 12,
            points: 40,
            pro_id: 0,
          },
          newPoints: 100,
        }
    }

    componentDidMount() {
      let character = this.state.character
      character.points += this.state.newPoints
      this.setState({character})
    }

    render() {
        return (
            <div className='container'>
                <div className='defeated-title'>You have slain the beast!</div>
                <div className='defeated-subtitle'>
                  Your character has gained {this.state.newPoints} experience points.
                </div>
                <CharacterCard character={this.state.character}/>
                <div className='new-battle-button' onClick={() => this.props.setScreen(0)}>new battle</div>
            </div>
        )
    }
}

export default DefeatedMonsterScreen
