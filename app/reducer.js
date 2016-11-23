import { combineReducers } from 'redux'
import buildReducer from 'build-reducer'

export default combineReducers({
  state: buildReducer({
    start (state) {
      return 'started'
    },
    stop (state) {
      return 'stopped'
    }
  }, 'stopped'),

  settings: buildReducer({
    updateSetting (state, { name, inc, dec }) {
      return {
        ...state,
        [name]: state[name] + (inc || 0) - (dec || 0)
      }
    }
  }, {}),

  timer: buildReducer({
    start (state, { interval, settings }) {
      const prevTime = new Date().getTime()
      return {
        settings,
        counts: settings,
        interval,
        prevTime
      }
    },
    update (state) {
      const prevTime = new Date().getTime()
      const dt = prevTime - state.prevTime
      let { count, settings, counts } = state
      let { hang, rest, reps, recover } = counts
      if (counts.hang > 0) {
        count = 'hang'
        hang = Math.max(0, counts.hang - (dt / 1000))
      } else if (counts.rest > 0) {
        count = 'rest'
        rest = Math.max(0, counts.rest - (dt / 1000))
      } else if (counts.reps > 0) {
        count = 'reps'
        reps = counts.reps - 1
        hang = settings.hang
        rest = settings.rest
      } else if (counts.recover > 0) {
        count = 'recover'
        recover = Math.max(0, counts.recover - (dt / 60 / 1000))
      } else {
        count = 'hang'
        hang = settings.hang
        rest = settings.rest
        reps = settings.reps
      }
      return {
        ...state,
        counts: { hang, rest, reps, recover },
        count,
        prevTime
      }
    },
    stop (state) {
      clearInterval(state.interval)
      return {
        ...state,
        settings: null,
        count: null
      }
    }
  }, { counts: {} }),

  countdown: buildReducer({
    startCountdown (state, { interval }) {
      const prevTime = new Date().getTime()
      return {
        count: 3,
        interval,
        prevTime
      }
    },
    countdown (state) {
      const prevTime = new Date().getTime()
      const dt = prevTime - state.prevTime
      const count = Math.max(0, state.count - (dt / 1000))
      if (count > 0) {
        return {
          ...state,
          count,
          prevTime
        }
      } else {
        clearInterval(state.interval)
        return {}
      }
    }
  }, {})
})

