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

function serializeResource (resource) {
  return {
    ...resource,
    id: resource.url.split("/").reverse()[1]
  }
}

function resource (state, action) {
  console.log(action.type)
  console.log(action.name)
  switch (action.type) {
    case FETCH_RESOURCE_REQUEST:
      return {...state, isFetching: true, error: null}
    case FETCH_RESOURCE_SUCCESS:
      const resources = {...state[action.name]}
      const serialized = serializeResource(action.payload)
      resources.data[serialized.id] = serialized
      return {...state, isFetching: false, [action.name]: resources}
    case FETCH_RESOURCE_FAILURE:
      return {...state, isFetching: false, error: action.payload}
    default:
      return state
  }
}

function resources (state, action) {
  switch (action.type) {
    case FETCH_RESOURCES_BY_NAME_REQUEST:
      return {...state, isFetching: true, error: null}
    case FETCH_RESOURCES_BY_NAME_SUCCESS:
      const resources = {
        count: action.payload.count,
        page: action.payload.page || state[action.name.page] || 1,
        data: {...((state[action.name] && state[action.name].data) || {})}
      }
      action.payload.results.map(el => serializeResource(el)).forEach(el => {
        resources.data[el.id] = el
      })
      return {...state, isFetching: false, [action.name]: resources}
    case FETCH_RESOURCES_BY_NAME_FAILURE:
      return {...state, isFetching: false, error: action.payload}
    default:
      return state
  }
}

function resourcesMap (state, action) {
  switch (action.type) {
    case FETCH_RESOURCES_MAP_REQUEST:
      return {...state, isFetching: true, error: null}
    case FETCH_RESOURCES_MAP_SUCCESS:
      const resourcesByKey = {}
      Object.keys(action.payload).forEach(el => {
        resourcesByKey[el] = state[el] || {
          count: 0,
          page: null,
          data: {}
        }
      })
      return {...state, isFetching: false, resourcesMap: action.payload, ...resourcesByKey}
    case FETCH_RESOURCES_MAP_FAILURE:
      return {...state, isFetching: false, error: state.payload}
    default:
      return state
  }
}

export default reduceReducers({
  resourcesMap: {},
  isFetching: false,
  error: null
}, resourcesMap, resources, resource)