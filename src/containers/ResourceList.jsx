import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import ListView from 'components/ListView'
import { withRouter } from 'react-router-dom'
import { resourcesActions, resourcesSelectors } from 'store/resources'
import ListItem from 'components/ListItem'
import Pagination from 'components/Pagination'
import Search from 'components/Search'
import Typography from '@material-ui/core/Typography'
import { capitalize } from 'lodash'
import Loader from 'components/ui/Loader'

function ResourceList ({data, history, resourcesMeta, location, getResources, ...props}) {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const resourceName = props.match.params.resourceName
  const page = new URL(window.location.href).searchParams.get('page')

  const fetchResources = useCallback(async (name, params) => {
    setIsFetching(true)
    setError(null)
    try {
      await getResources(name, params)
    } catch (error) {
      setError(error)
    } finally {
      setIsFetching(false)
    }
  }, [getResources]) 

  const updateSearch = useCallback(async (search) => {
    history.push({search: 'page=1'})
    await fetchResources(resourceName, {page: 1, search})
  }, [fetchResources, resourceName, history])
  
  function _keyExtractor (el) {
    return el.id
  }
  
  useEffect(() => {
    fetchResources(resourceName, {page})
  }, [resourceName, page, fetchResources])
  

  return (
    <div className={'resource-list'}>
      <Typography variant="h2" gutterBottom>
        {capitalize(resourceName)}
      </Typography>
      <Search resourceName={resourceName}
              isSearch={resourcesMeta.isSearch}
              searchString={resourcesMeta.search}
              updateSearch={updateSearch}/>
      {
        error ? error.message :
          <ListView
            data={data}
            renderItem={item => <ListItem data={item} location={location}/>}
            keyExtractor={_keyExtractor}
          />
      }
      <Pagination meta={resourcesMeta}/>
      <Loader show={isFetching}/>
    </div>
  )
}

export default withRouter(connect(
  (state, props) => ({
    data: resourcesSelectors.getPageResources(state, props.match.params.resourceName),
    resourcesMeta: resourcesSelectors.getResourcesMeta(state, props.match.params.resourceName)
  }),
  {
    getResources: resourcesActions.getResourcesByName
  }
)(ResourceList)) 