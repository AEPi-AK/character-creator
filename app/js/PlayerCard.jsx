import React from 'react'

// import '../less/RaceScreen.less'

class PlayerCard extends React.Component {

  render() {
      return (
        <div className='player-card-container'>
          <img src={`static/img/Human.png`}/>
          <div>Level: ?</div>
        </div>
      )
    }
}

export default PlayerCard
