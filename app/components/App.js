import React from 'react'

import Timer from './Timer'
import Toggle from './Toggle'
import Countdown from './Countdown'

export default class App extends React.Component {
  render () {
    return <div className='app'>
      <Timer {...this.props} />
      <Toggle {...this.props} />
      <Countdown {...this.props} />
    </div>
  }
}
