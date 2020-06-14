import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import axios from 'axios'

import rootReducer from './redux'

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  thunkMiddleware.withExtraArgument({ axios })
]

if (process.browser) {
  // We'd like the redux logger to only log messages when it's running in the browser
  middleware = [...middleware, createLogger({ collapsed: true })]
}

export default createStore(
  rootReducer,
  applyMiddleware(...middleware)
)
