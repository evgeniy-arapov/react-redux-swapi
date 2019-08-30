import * as swapiService from "services/swapi"

export const FETCH_RESOURCE_REQUEST = "FETCH_RESOURCE_REQUEST"
export const FETCH_RESOURCE_SUCCESS = "FETCH_RESOURCE_SUCCESS"
export const FETCH_RESOURCE_FAILURE = "FETCH_RESOURCE_FAILURE"

export function getResource (name, id) {
  return async dispatch => {
    dispatch({
      type: FETCH_RESOURCE_REQUEST,
      name
    })
    let response
    try {
      response = await swapiService.getResource(name, id)
      dispatch({
        type: FETCH_RESOURCE_SUCCESS,
        name,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: FETCH_RESOURCE_FAILURE,
        name,
        payload: error
      })
    }
  }
}

export const FETCH_RESOURCES_BY_NAME_REQUEST = "FETCH_RESOURCES_BY_NAME_REQUEST"
export const FETCH_RESOURCES_BY_NAME_SUCCESS = "FETCH_RESOURCES_BY_NAME_SUCCESS"
export const FETCH_RESOURCES_BY_NAME_FAILURE = "FETCH_RESOURCES_BY_NAME_FAILURE"

export function getResourcesByName (name, params = {}) {
  return async dispatch => {
    dispatch({
      type: FETCH_RESOURCES_BY_NAME_REQUEST,
      name
    })
    try {
      const response = await swapiService.getResourcesByName(name, params)
      dispatch({
        type: FETCH_RESOURCES_BY_NAME_SUCCESS,
        name,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: FETCH_RESOURCES_BY_NAME_FAILURE,
        name,
        payload: error
      })
    }
  }
}

export const FETCH_RESOURCES_MAP_REQUEST = "FETCH_RESOURCES_MAP_REQUEST"
export const FETCH_RESOURCES_MAP_SUCCESS = "FETCH_RESOURCES_MAP_SUCCESS"
export const FETCH_RESOURCES_MAP_FAILURE = "FETCH_RESOURCES_MAP_FAILURE"

export function getResourcesMap () {
  return async dispatch => {
    dispatch({
      type: FETCH_RESOURCES_MAP_REQUEST
    })
    try {
      const categoriesMap = await swapiService.getResourcesMap()
      dispatch({
        type: FETCH_RESOURCES_MAP_SUCCESS,
        payload: categoriesMap
      })
    } catch (error) {
      dispatch({
        type: FETCH_RESOURCES_MAP_FAILURE,
        payload: error
      })
    }
  }
}