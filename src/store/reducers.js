import { combineReducers } from 'redux'
import resources from './resources/reducer'
import errors from './common/errorsReducer'


export default combineReducers({
  resources,
  errors
})