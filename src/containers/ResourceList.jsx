import React, { Component } from "react"
import { connect } from "react-redux"
import ListView from "components/ListView"
import { withRouter } from "react-router-dom"
import { resourcesActions, resourcesSelectors } from "store/resources"
import ListItem from "components/ListItem"
import Pagination from "components/Pagination"

class ResourceList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFetching: false
    }
  }

  async componentDidMount () {
    const page = new URL(window.location.href).searchParams.get("page")
    this.setState({isFetching: true})
    await this.props.getResources(this.props.match.params.resourceName, {page})
    this.setState({isFetching: false})
  }

  async componentDidUpdate (prevProps, prevState, snapshot) {
    const currentUrl = new URL(window.location.href)
    const page = currentUrl.searchParams.get("page")
    const {search, pathname} = prevProps.location
    const prevUrl = new URL(pathname + search, window.location.href)
    if (currentUrl.href !== prevUrl.href) {
      this.setState({isFetching: true})
      await this.props.getResources(this.props.match.params.resourceName, {page})
      this.setState({isFetching: false})    }
  }

  _keyExtractor (el) {
    return el.id
  }

  render () {
    const {data} = this.props
    return (
      <div>
        <Pagination meta={this.props.resourcesMeta}/>
        {
          this.state.isFetching ? "wait..." :
            <ListView
              data={data}
              renderItem={item => <ListItem data={item} location={this.props.location}/>}
              keyExtractor={this._keyExtractor}
            />
        }
        <Pagination meta={this.props.resourcesMeta}/>
      </div>
    )
  }
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