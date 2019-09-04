import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import errorHandler from "middleware/errorHandler"
import rootReducer from "./reducers"

export default createStore(
    rootReducer,
    applyMiddleware(
      thunk
      ,errorHandler
    )
)