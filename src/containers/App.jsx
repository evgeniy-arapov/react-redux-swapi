import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Container } from "@material-ui/core"
import Header from "components/layout/Header"
import "./App.scss"
import { resourcesActions, resourcesSelectors } from "store/resources"
import { errorsSelectors } from "store/common/errorsReducer"
import { Route, Switch } from "react-router-dom"
import ResourceList from "containers/ResourceList"
import ResourceItem from "containers/ResourceItem"
import Loader from "components/ui/Loader"

function App (props) {
  const [isLoading, setIsLoading] = useState(false)
  const {
          getResourcesMap,
          resourcesNames,
          errors
        } = props

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true)
        await getResourcesMap()
      } catch (e) {
        throw e
      } finally {
        setIsLoading(false)
      }
    })()
  }, [getResourcesMap])

  if (errors && errors.length) {
    console.warn("ERRORS")
    console.error(errors)
  }
  return (
    <div className="App">
      <Header linksNames={resourcesNames}/>
      <Container>
        <Switch>
          <Route exact path="/:resourceName" component={ResourceList}/>
          <Route path="/:resourceName/:itemId" component={ResourceItem}/>
        </Switch>
      </Container>
      <Loader show={isLoading}/>
    </div>
  )
}

export default connect(
  state => ({
    resourcesNames: resourcesSelectors.getResourcesNames(state),
    errors: errorsSelectors.getErrors(state),
    state
  }),
  dispatch => ({
    getResourcesMap: () => dispatch(resourcesActions.getResourcesMap()),
    dispatch
  })
)(App)