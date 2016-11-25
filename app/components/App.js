import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classnames'
import Slideout from 'slideout'

import Menu from './Menu'
import Timer from './Timer'
import Toggle from './Toggle'

import Countdown from './Countdown'

export default class App extends React.Component {
  componentDidUpdate () {
    const { menu, panel, instance } = this.props.slideout
    if (!instance && menu && panel) {
      this.props.dispatch({
        type: 'setSlideout',
        instance: new Slideout({ panel, menu })
      })
    }
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'setSlideout',
      panel: findDOMNode(this.refs.panel)
    })
  }
  render () {
    return <div className='app'>
      <Menu {...this.props} />
      <div ref='panel' className={cn('panel', this.props.state)}>
        <Timer {...this.props} />
        <Toggle {...this.props} />
        <div className='profile'>
          {this.props.profile ? this.props.profile.name : null}
        </div>
        <Countdown {...this.props} />
      </div>
    </div>
  }
}
