import React from 'react'
import cn from 'classnames'

import Timer from './Timer'

export default class App extends React.Component {
  toggle (e) {
    e.preventDefault()
    const { dispatch, state, settings } = this.props
    if (state === 'stopped') {
      const interval = setInterval(() => {
        dispatch({ type: 'update' })
      }, 100)
      dispatch({ type: 'start', interval, settings })
    } else {
      dispatch({ type: 'stop' })
    }
  }
  stop (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'stop' })
  }
  render () {
    return <div className='app'>
      <Timer {...this.props} />
      <button className={cn('toggle', this.props.state)} onClick={this.toggle.bind(this)} />
    </div>
  }
}
