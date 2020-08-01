/**
 * Вывод конкретного ресурса
 * @module ResourceItem
 * */

import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { resourcesSelectors, resourcesActions } from 'store/resources'
import ShowItem from 'components/ShowItem'
import Loader from 'components/ui/Loader'
import config from 'config'

function ResourceItem ({getResourceItem, data, getResourceSelector, ...props}) {
  const routeParams = props.match.params
  const [resolvedData, setResolvedData] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)

  const fetch = useCallback(async fetchFunc => {
    setIsFetching(true)
    try {
      await fetchFunc()
    } catch (error) {
      setError(error)
    } finally {
      setIsFetching(false)
    }
  }, [])

  // componentDidMount
  useEffect(() => {
    fetch(() => getResourceItem(routeParams.resourceName, routeParams.itemId))
  }, [fetch, getResourceItem, routeParams.resourceName, routeParams.itemId])

  // componentDidUpdate
  useEffect(() => {
    if (isFetching || error) return

    //const isRouteChanged = this.props.match.url !== prevProps.match.url
    //if (isRouteChanged) setResolvedData(null)
    if (!data || resolvedData) return

    const newResolvedData = {...data}
    const promiseArray = []
    const relatedProps = {}

    const parseUrl = url => {
      const [, id, name] = url.split('/').reverse()
      return {name, id}
    }

    Object.keys(newResolvedData).forEach(key => {
      if (newResolvedData[key] instanceof Array) {
        relatedProps[key] = []
        newResolvedData[key].forEach(el => {
          const {name, id} = parseUrl(el)
          promiseArray.push(getResourceItem(name, id))
          relatedProps[key].push({name, id})
        })
      }
      if (typeof newResolvedData[key] === 'string' && key !== 'url') {
        if (newResolvedData[key].includes(config.API_BASE_URL)) {
          const {name, id} = parseUrl(newResolvedData[key])
          promiseArray.push(getResourceItem(name, id))
          relatedProps[key] = {name, id}
        }
      }
    })

    fetch(async () => {
      await Promise.all(promiseArray)
      Object.keys(relatedProps).forEach(key => {
        if (relatedProps[key] instanceof Array) {
          newResolvedData[key] = relatedProps[key].map(el => getResourceSelector(el.name, el.id))
        } else {
          newResolvedData[key] = getResourceSelector(relatedProps[key].name, relatedProps[key].id)
        }
      })

      newResolvedData.relatedProps = Object.keys(relatedProps)
      setResolvedData(newResolvedData)
    })
  }, [isFetching, error, resolvedData, fetch, data, getResourceItem, getResourceSelector])

  return (
    <div>
      {
        error ? error.message :
          resolvedData ? <ShowItem data={resolvedData}/> :
            null
      }
      <Loader show={isFetching}/>
    </div>
  )
}

export default withRouter(connect(
  (state, props) => ({
    data: resourcesSelectors.getResource(state, props.match.params.resourceName, props.match.params.itemId),
    getResourceSelector: resourcesSelectors.getResource.bind(null, state)
  }),
  {
    getResourceItem: resourcesActions.getResource
  }
)(ResourceItem))
