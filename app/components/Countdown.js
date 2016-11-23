import React from 'react'
import { Howl } from 'howler'

export default class Countdown extends React.Component {
  constructor (props) {
    super(props)
    this.sound = new Howl({
      src: ['./audio/countdown.mp3']
    })
  }
  componentDidUpdate (prevProps) {
    const prevCount = prevProps.countdown.count
    const count = this.props.countdown.count
    const countChanged = Math.ceil(prevCount) !== Math.ceil(count)
    if (prevCount && countChanged) {
      if (prevCount && count) {
        this.sound.play()
      }
      if (!this.props.countdown.count) {
        this.start()
      }
    }
  }
  start () {
    const { dispatch, settings } = this.props
    const interval = setInterval(() => {
      dispatch({ type: 'update' })
    }, 100)
    dispatch({ type: 'start', interval, settings })
  }
  render () {
    const { countdown } = this.props
    return countdown.count
      ? <div className='countdown'>{Math.ceil(countdown.count)}</div>
      : null
  }
}
