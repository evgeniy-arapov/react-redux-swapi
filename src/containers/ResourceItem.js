import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { resourcesSelectors, resourcesActions } from "store/resources"
import ShowItem from "components/ShowItem"

let i = 0

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
    if (!data || (!!resolvedData && resolvedData.id === data.id)) return

    this.setState({isFetching: true})
    
    const newResolvedData = {...data}
    const promiseArray = []
    const relatedOptions = {}

    const parseUrl = url => {
      const urlArray = url.split("/").reverse()
      const name = urlArray[2]
      const id = urlArray[1]
      return {name, id}
    }

    Object.keys(newResolvedData).forEach(key => {
      if (newResolvedData[key] instanceof Array) {
        relatedOptions[key] = []
        newResolvedData[key].forEach(el => {
          const {name, id} = parseUrl(el)
          promiseArray.push(this.props.getResourceItem(name, id))
          relatedOptions[key].push({name, id})
        })
      }
      if (typeof newResolvedData[key] === "string" && key !== "url") {
        if (newResolvedData[key].includes("https://swapi.co/api/")) {
          const {name, id} = parseUrl(newResolvedData[key])
          promiseArray.push(this.props.getResourceItem(name, id))
          relatedOptions[key] = {name, id}
        }
      }
    })
    try {
      await Promise.all(promiseArray)
      Object.keys(relatedOptions).forEach(key => {
        if (relatedOptions[key] instanceof Array) {
          newResolvedData[key] = relatedOptions[key].map(el => this.props.getResourceSelector(el.name, el.id))
        } else {
          newResolvedData[key] = this.props.getResourceSelector(relatedOptions[key].name, relatedOptions[key].id)
        }
      })

      newResolvedData.relatedOptions = Object.keys(relatedOptions)
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