import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import errorHandler from 'middleware/errorHandler'
import logger from 'middleware/logger'
import rootReducer from './reducers'

export default createStore(
    rootReducer,
    applyMiddleware(
      thunk,
      errorHandler,
      //logger
    )
)
