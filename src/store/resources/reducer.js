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
  console.log(action.type)
  console.log("action.name: ", action.name)
  switch (action.type) {
    case FETCH_RESOURCE_REQUEST:
      return {...state, error: null}
    case FETCH_RESOURCE_SUCCESS:
      let resources
      if(state[action.name]) {
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
      const resourceData = (state[action.name] && state[action.name].data) || {}
      const resources = {
        count: action.payload.count,
        page: state[action.name.page] || 1,
        data: {...resourceData},
        pageData: []
      }
      action.payload.results.forEach(el => {
        resources.data[el.id] = el
        resources.pageData.push(el.id)
      })
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