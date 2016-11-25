import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classnames'

export default class Menu extends React.Component {
  componentDidMount () {
    this.props.dispatch({
      type: 'setSlideout',
      menu: findDOMNode(this)
    })
  }
  saveProfile (e) {
    e.preventDefault()
    const name = window.prompt('Profile name: ')
    if (!name) return
    const { dispatch, settings } = this.props
    dispatch({ type: 'saveProfile', name, settings })
  }
  selectProfile (profile, e) {
    e.preventDefault()
    const { dispatch, slideout } = this.props
    dispatch({ type: 'selectProfile', profile })
    slideout.instance.close()
  }
  newProfile (e) {
    e.preventDefault()
    this.props.dispatch({ type: 'selectProfile', profile: null })
  }
  delProfile (e) {
    e.preventDefault()
    const { dispatch, profile } = this.props
    dispatch({ type: 'delProfile', profile })
  }
  renderProfile (profile, i) {
    const currId = this.props.profile ? this.props.profile.id : null
    return <a onClick={this.selectProfile.bind(this, profile)}
      className={cn({'-active': profile.id === currId})}
      key={i} href='#'>
      {profile.name}
    </a>
  }
  render () {
    const { profile, profiles } = this.props
    return <nav className='menu'>
      {profile
      ? [
        <a onClick={this.newProfile.bind(this)} key='new' href='#'>New profile</a>,
        <a onClick={this.delProfile.bind(this)} key='delete' href='#'>Delete profile</a>
      ]
      : <a onClick={this.saveProfile.bind(this)} href='#'>Save profile</a>}
      <div className='profiles'>
        {profiles.map(this.renderProfile.bind(this))}
      </div>
    </nav>
  }
}
