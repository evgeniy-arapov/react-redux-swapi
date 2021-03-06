import reduceReducers from "reduce-reducers"

import {
  FETCH_RESOURCES_MAP_FAILURE,
  FETCH_RESOURCES_MAP_SUCCESS,
  FETCH_RESOURCES_MAP_REQUEST,
  FETCH_RESOURCES_BY_NAME_FAILURE,
  FETCH_RESOURCES_BY_NAME_SUCCESS,
  FETCH_RESOURCES_BY_NAME_REQUEST,
  FETCH_RESOURCE_FAILURE,
  FETCH_RESOURCE_REQUEST,
  FETCH_RESOURCE_SUCCESS
} from "store/resources/actions"

function resource (state, action) {
  switch (action.type) {
    case FETCH_RESOURCE_REQUEST:
      return {...state, error: null}
    case FETCH_RESOURCE_SUCCESS:
      let resources
      if (state[action.name]) {
        resources = {
          ...state[action.name]
        }
      } else {
        resources = {
          data: {}
        }
      }
      resources.data[action.payload.id] = action.payload
      return {...state, [action.name]: resources}
    case FETCH_RESOURCE_FAILURE:
      return {...state, error: action.payload}
    default:
      return state
  }
}

function resources (state, action) {
  switch (action.type) {
    case FETCH_RESOURCES_BY_NAME_REQUEST:
      return {...state, error: null}
    case FETCH_RESOURCES_BY_NAME_SUCCESS:
      let resources = {
        count: action.payload.count,
        ...action.params
      }
      if (state[action.name]) {
        resources = {
          ...state[action.name],
          ...resources
        }
      }
      if (!resources.data) resources.data = {}
      if (!resources.pageData) resources.pageData = {}

      const {page} = action.params

      if (resources.search) {
        resources.searchPageIds = []
        action.payload.results.forEach(el => {
          resources.data[el.id] = el
          resources.searchPageIds.push(el.id)
        })
      } else if (!(resources.pageData[page] && resources.pageData[page].length)) {
        resources.pageData[page] = []
        action.payload.results.forEach(el => {
          resources.data[el.id] = el
          resources.pageData[page].push(el.id)
        })
      }
      return {...state, [action.name]: resources}
    case FETCH_RESOURCES_BY_NAME_FAILURE:
      return {...state, error: action.payload}
    default:
      return state
  }
}

function resourcesMap (state, action) {
  switch (action.type) {
    case FETCH_RESOURCES_MAP_REQUEST:
      return {...state, error: null}
    case FETCH_RESOURCES_MAP_SUCCESS:
      return {...state, resourcesMap: action.payload}
    case FETCH_RESOURCES_MAP_FAILURE:
      return {...state, error: state.payload}
    default:
      return state
  }
}

export default reduceReducers({
  resourcesMap: {},
  error: null
}, resourcesMap, resources, resource)