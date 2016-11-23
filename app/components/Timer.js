import React from 'react'
import cn from 'classnames'
import { Howl } from 'howler'

class Count extends React.Component {
  constructor (props) {
    super(props)
    this.sound = new Howl({
      src: [`./audio/${props.name}.mp3`]
    })
  }
  componentDidUpdate (prevProps) {
    const value = this.props.timer.counts[this.props.name]
    const valueChanged = Math.ceil(value) !==
      Math.ceil(prevProps.timer.counts[prevProps.name])
    if (value > 0 && valueChanged) {
      this.sound.play()
    }
  }
  update (op, val, e) {
    e.preventDefault()
    const { dispatch, settings, name, min, max } = this.props
    const value = settings[name]
    if ((op === 'dec' && value <= min) ||
        (op === 'inc' && value >= max)) {
      return
    }
    dispatch({
      type: 'updateSetting',
      [op]: val,
      name
    })
  }
  render () {
    const { state, settings, timer, name, label, unit } = this.props
    const isStopped = state === 'stopped'
    const counts = isStopped ? settings : timer.counts
    const value = counts[name]
    let roundValue = Math.ceil(value)
    roundValue = roundValue || (name === 'reps') ? roundValue : ''
    const progress = value / settings[name]
    return <div className={cn('count', name, { active: name === timer.count })}>
      <div className='count-bg' style={{ height: (progress * 100) + '%' }} />
      <span className='label'>{label}</span>
      {isStopped
        ? <button className='up' onClick={this.update.bind(this, 'inc', 1)} />
        : null}
      <div className='value'>{roundValue}</div>
      {isStopped
        ? <button className='down' onClick={this.update.bind(this, 'dec', 1)} />
        : null}
      <span className='label'>{unit}</span>
    </div>
  }
}

export default class Timer extends React.Component {
  constructor (props) {
    super(props)
    this.startSound = new Howl({
      src: ['./audio/rep_start.mp3']
    })
    this.endSound = new Howl({
      src: ['./audio/rep_end.mp3']
    })
  }
  componentDidUpdate (prevProps) {
    const { count } = this.props.timer
    if (count !== prevProps.timer.count) {
      switch (count) {
        case 'hang':
          this.startSound.play()
          break
        case 'rest':
          this.endSound.play()
          break
      }
    }
  }
  render () {
    return <div className='timer'>
      <Count name='hang' label='Hang' unit='secs' min={1} max={99} {...this.props} />
      <Count name='rest' label='Rest' unit='secs' min={1} max={99} {...this.props} />
      {this.props.state === 'started'
        ? <Count name='reps' label='Reps' unit='left' min={1} max={99} {...this.props} />
        : <Count name='reps' label='Reps' unit='total' min={1} max={99} {...this.props} />}
      <Count name='recover' label='Recover' unit='mins' min={1} max={99} {...this.props} />
    </div>
  }
}
