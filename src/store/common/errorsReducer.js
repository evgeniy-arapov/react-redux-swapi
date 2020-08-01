import {
  FETCH_RESOURCE_FAILURE,
  FETCH_RESOURCES_BY_NAME_FAILURE,
  FETCH_RESOURCES_MAP_FAILURE
} from 'store/resources/actions'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RESOURCE_FAILURE:
    case FETCH_RESOURCES_BY_NAME_FAILURE:
    case FETCH_RESOURCES_MAP_FAILURE:
      return [...state, action.payload]
    default:
      return state
  }
}

export const errorsSelectors = {
  getErrors: state => state.errors
}