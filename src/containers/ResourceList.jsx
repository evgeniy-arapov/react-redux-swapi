import React, { Component } from "react"
import { connect } from "react-redux"
import ListView from "components/ListView"
import { withRouter } from "react-router-dom"
import { resourcesActions, resourcesSelectors } from "store/resources"
import ListItem from "components/ListItem"

class ResourceList extends Component {
  componentDidMount () {
    this.props.getResources(this.props.match.params.resourceName)
  }
  
  componentDidUpdate (prevProps, prevState, snapshot) {
    if(prevProps.match.params.resourceName !== this.props.match.params.resourceName)
      this.props.getResources(this.props.match.params.resourceName)
  }

  _keyExtractor (el) {
    return el.id
  }

  render () {
    const {data} = this.props
    return (
      <div>
        <ListView
          data={data}
          renderItem={item => <ListItem data={item} location={this.props.location}/>}
          keyExtractor={this._keyExtractor}
        />
      </div>
    )
  }
}

export default withRouter(connect(
  (state, props) => ({
    data: resourcesSelectors.getPageResources(state, props.match.params.resourceName)
  }),
  {
    getResources: resourcesActions.getResourcesByName
  }
)(ResourceList)) 