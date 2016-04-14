import React from 'react'
import ReactDOM from 'react-dom'

import './Scanner.less'

const REFOCUS_INTERVAL = 250

class Scanner extends React.Component {

  componentDidMount() {
    this.timer = setInterval(() => this.refs.input.focus(), REFOCUS_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onKeyUp(e) {
    // Only when the return key is pressed
    if (e.keyCode !== 13) return

    const inputNode = ReactDOM.findDOMNode(this.refs.input)
    this.props.onData(inputNode.value)
    inputNode.value = ''
  }

  render() {
    return (
      <input
        type='text'
        ref='input'
        onKeyUp={this.onKeyUp.bind(this)}
        autoFocus={true}
        onBlur={() => this.refs.input.focus()}
      />
    )
  }

}

export default Scanner
