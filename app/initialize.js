import ReactDOM from 'react-dom'
import React from 'react'
import App from 'components/App'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'

import reducer from './reducer'

const ConnectedApp = connect(state => state)(App)

document.addEventListener('DOMContentLoaded', () => {
  const store = createStore(reducer, {
    countdown: 3,
    settings: {
      hang: 7,
      rest: 3,
      reps: 6,
      recover: 3
    }
  })
  ReactDOM.render(<Provider store={store}>
    <ConnectedApp />
  </Provider>, document.querySelector('#app'))
})
