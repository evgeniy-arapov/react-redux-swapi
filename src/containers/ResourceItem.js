import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { resourcesSelectors, resourcesActions } from "store/resources"
import ShowItem from "components/ShowItem"


class ResourceItem extends Component {
  componentDidMount () {
    this.props.getResourceItem(this.props.match.params.resourceName, this.props.match.params.itemId)
  }

  render () {
    const {data} = this.props
    return (
      <div>
        {
          data ? <ShowItem data={data}/> : "wait..."
        }
      </div>
    )
  }
}

export default withRouter(connect(
  (state, props) => ({
    data: resourcesSelectors.getResource(state, props.match.params.resourceName, props.match.params.itemId)
  }),
  {
    getResourceItem: resourcesActions.getResource
  }
)(ResourceItem))