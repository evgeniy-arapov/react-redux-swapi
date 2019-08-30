import React from "react"
import { connect } from "react-redux"
import Header from "components/layout/Header"
import "./App.scss"
import { resourcesActions, resourcesSelectors } from "store/resources"
import { errorsSelectors } from "store/common/errorsReducer"

class App extends React.Component {
  async componentDidMount () {
    this.props.getResourcesMap()
    this.props.dispatch(resourcesActions.getResourcesByName("people"))
    this.props.dispatch(resourcesActions.getResourcesByName("planets"))
    this.props.dispatch(resourcesActions.getResource("planets", 12))
  }

  componentDidCatch (error, errorInfo) {
    console.error(arguments)
  }

  render () {
    console.log(this.props.state)
    const {planets, errors, planet12} = this.props
    if (errors.length) {
      console.warn("ERRORS")
      console.error(errors)
    }
    return (
      <div className="App">
        <Header linksNames={this.props.resourcesNames}/>
        <div>
          {
            planets && planets.data && Object.keys(planets.data).map(el => {
              const resource = planets.data[el]
              return <div key={resource.url}>{resource.url}</div>
            })
          }
          <div>
            Planet12: {planet12 && planet12.name}
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    resourcesNames: resourcesSelectors.getResourcesNames(state),
    people: resourcesSelectors.getResources(state, "people"),
    planets: resourcesSelectors.getResources(state, "planets"),
    errors: errorsSelectors.getErrors(state),
    planet12: resourcesSelectors.getResource(state, "planets", 12),
    state
  }),
  dispatch => ({
    getResourcesMap: () => dispatch(resourcesActions.getResourcesMap()),
    dispatch
  })
)(App)