import React from 'react'
import ReactDOM from 'react-dom'

import Tavern from './tavern/Tavern.jsx'
import ForestPlayer from './forest/ForestPlayer.jsx'
import ForestMonster from './forest/ForestMonster.jsx'
import CrashScreen from './CrashScreen.jsx'

// Trap all errors
window.onerror = () => {
  ReactDOM.render(<CrashScreen/>, document.getElementById('root'))
}

// Monkeypatch console.log
window.console.log = (str, ...strs) => {
  const msg = str + strs.join(' ')
  const node = window.document.getElementById('debug-console')
  node.scrollTop = node.scrollHeight;
  node.innerHTML += (msg + '\n')
  console.debug(msg)
}

// Special tap-spam traps
document.getElementById('debug-console').addEventListener('click', event => {
  const node = event.target
  if (!node.hasOwnProperty('isaacsucks')) {
    node.isaacsucks = {
      timer: null,
      counter: 0,
    }
  }
  clearTimeout(node.isaacsucks.timer)
  node.isaacsucks.counter += 1
  node.isaacsucks.timer = setTimeout(() => {
    node.isaacsucks.counter = 0
  }, 750)
  if (node.isaacsucks.counter >= 7) {
    node.isaacsucks.counter = 0
    if (event.clientX >= 250) {
      return window.location.reload()
    }
    if (window.DEBUG_MODE === true) {
      console.log('debug mode disabled')
      window.DEBUG_MODE = false
      window.console.log = window.old_log
      node.style.opacity = 0
      return
    }
    console.log('debug mode enabled')
    window.DEBUG_MODE = true
    window.old_log = window.console.log
    node.style.opacity = 1
  }
})

window.IS_ELECTRON = window.location.search.includes('electron')
window.APP_MODE = window.location.search.split('mode=')[1]
window.API_BASE = window.IS_ELECTRION ? 'http://api.ExileFromMorewood.com' : 'http://localhost:8000'

console.log('IS_ELECTRON = ', window.IS_ELECTRON)
console.log('APP_MODE = ', window.APP_MODE)
console.log('API_BASE = ', window.API_BASE)

class Main extends React.Component {

  render() {
    if (window.APP_MODE === 'tavern') {
      return <Tavern/>
    }
    if (window.APP_MODE === 'forest-player') {
      return <ForestPlayer/>
    }
    if (window.APP_MODE === 'forest-monster') {
      return <ForestMonster/>
    }
    return <h1>Unknown app mode: {window.APP_MODE}</h1>
  }

}

ReactDOM.render(<Main/>, document.getElementById('root'))
