import React from "react"
import { connect } from "react-redux"
import { Container } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import Header from "components/layout/Header"
import "./App.scss"
import { resourcesActions, resourcesSelectors } from "store/resources"
import { errorsSelectors } from "store/common/errorsReducer"
import { Route, Switch } from "react-router-dom"
import ResourceList from "containers/ResourceList"
import ResourceItem from "containers/ResourceItem"

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false
    }
  }

  async componentDidMount () {
    try {
      this.setState({isLoading: true})
      await this.props.getResourcesMap()
    } catch (e) {
      throw e
    } finally {
      //this.setState({isLoading: false})
    }
  }

  componentDidCatch (error, errorInfo) {
    console.error(arguments)
  }

  render () {
    const {errors} = this.props
    if (errors && errors.length) {
      console.warn("ERRORS")
      console.error(errors)
    }

    return (
      <div className="App">
        <Header linksNames={this.props.resourcesNames}/>
        <Container>
          <Switch>
            <Route exact path="/:resourceName" component={ResourceList}/>
            <Route path="/:resourceName/:itemId" component={ResourceItem}/>
          </Switch>
        </Container>

        {this.state.isLoading &&
        <div className="loader">
          <CircularProgress color="primary" size={100}/>
        </div>
        }
      </div>
    )
  }
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