import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { resourcesSelectors, resourcesActions } from "store/resources"
import ShowItem from "components/ShowItem"

class ResourceItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      resolvedData: null,
      isFetching: false
    }
  }

  componentDidMount () {
    console.log("componentDidMount")
    this.props.getResourceItem(this.props.match.params.resourceName, this.props.match.params.itemId)
  }

  async componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.state.isFetching) return
    
    const data = this.props.data
    const resolvedData = this.state.resolvedData
    const isRouteChanged = this.props.match.url !== prevProps.match.url
    if(isRouteChanged) this.setState({resolvedData: null})
    if (!data || resolvedData) return

    this.setState({isFetching: true})
    
    const newResolvedData = {...data}
    const promiseArray = []
    const relatedProps = {}

    const parseUrl = url => {
      const [, id, name] = url.split("/").reverse()
      return {name, id}
    }

    Object.keys(newResolvedData).forEach(key => {
      if (newResolvedData[key] instanceof Array) {
        relatedProps[key] = []
        newResolvedData[key].forEach(el => {
          const {name, id} = parseUrl(el)
          promiseArray.push(this.props.getResourceItem(name, id))
          relatedProps[key].push({name, id})
        })
      }
      if (typeof newResolvedData[key] === "string" && key !== "url") {
        if (newResolvedData[key].includes("https://swapi.co/api/")) {
          const {name, id} = parseUrl(newResolvedData[key])
          promiseArray.push(this.props.getResourceItem(name, id))
          relatedProps[key] = {name, id}
        }
      }
    })
    try {
      await Promise.all(promiseArray)
      Object.keys(relatedProps).forEach(key => {
        if (relatedProps[key] instanceof Array) {
          newResolvedData[key] = relatedProps[key].map(el => this.props.getResourceSelector(el.name, el.id))
        } else {
          newResolvedData[key] = this.props.getResourceSelector(relatedProps[key].name, relatedProps[key].id)
        }
      })

      newResolvedData.relatedProps = Object.keys(relatedProps)
      this.setState({resolvedData: newResolvedData})
    } catch (e) {
      console.log("resolve failure")
      console.error(e)
    } finally {
      this.setState({isFetching: false})
    }
  }

  render () {
    console.log("1", this.state.resolvedData)
    return (
      <div>
        {
          this.state.resolvedData ? <ShowItem data={this.state.resolvedData}/> : "wait..."
        }
      </div>
    )
  }
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