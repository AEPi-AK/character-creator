import React from 'react'

import '../less/CrashScreen.less'

class CrashScreen extends React.Component {

  render() {
    return (
      <div className='crash-container'>
        <div className='text-big'>Uh-oh!</div>
        <div className='text-small'>
          Something went wrong.
          Please notify a booth attendant.
        </div>
      </div>
    )
  }
}

export default CrashScreen
