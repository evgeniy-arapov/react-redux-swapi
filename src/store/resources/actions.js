import * as swapiService from "services/swapi"
import { resourcesSelectors } from "store/resources"

export const FETCH_RESOURCE_REQUEST = "FETCH_RESOURCE_REQUEST"
export const FETCH_RESOURCE_SUCCESS = "FETCH_RESOURCE_SUCCESS"
export const FETCH_RESOURCE_FAILURE = "FETCH_RESOURCE_FAILURE"

export function getResource (name, id) {
  return async (dispatch, getState) => {
    dispatch({
      type: FETCH_RESOURCE_REQUEST,
      name
    })
    try {
      let response = resourcesSelectors.getResource(getState(), name, id)
      if (!response) {
        response = await swapiService.getResource(name, id)
          .then(res => serializeResource(res))
      }
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
  return async (dispatch, getState) => {
    const page = params.page || 1

    dispatch({
      type: FETCH_RESOURCES_BY_NAME_REQUEST,
      name,
      page
    })
    try {
      const resourcesMeta = resourcesSelectors.getResourcesMeta(getState(), name)
      let response
      if (resourcesMeta.count) {
        const pageResources = resourcesSelectors.getPageResources(getState(), name, page)
        if(pageResources.length) {
          response = {
            results: pageResources,
            ...resourcesMeta
          }
        }
      }
      if (!response) {
        response = await swapiService.getResourcesByName(name, params)
          .then(res => ({...res, results: res.results.map(el => serializeResource(el))}))
      }
      dispatch({
        type: FETCH_RESOURCES_BY_NAME_SUCCESS,
        name,
        page,
        payload: response
      })
    } catch (error) {
      dispatch({
        type: FETCH_RESOURCES_BY_NAME_FAILURE,
        name,
        page,
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

function serializeResource (resource) {
  return {
    ...resource,
    id: resource.url.split("/").reverse()[1]
  }
}