import React from 'react'

export default class Toggle extends React.Component {
  render () {
    return <button className='toggle' onClick={this.toggle.bind(this)} />
  }
  toggle (e) {
    e.preventDefault()
    const { dispatch, state } = this.props
    if (state === 'stopped') {
      const interval = setInterval(() => {
        dispatch({ type: 'countdown' })
      }, 100)
      dispatch({ type: 'startCountdown', interval })
    } else {
      dispatch({ type: 'stop' })
    }
  }
}
