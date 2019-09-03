import React, { Component } from "react"
import { Link } from "react-router-dom"

class ListItem extends Component {
  render () {
    const {data, location} = this.props
    return (
      <Link to={`${location.pathname}/${data.id}`}>{data.name || data.title}</Link>
    )
  }
}

export default ListItem