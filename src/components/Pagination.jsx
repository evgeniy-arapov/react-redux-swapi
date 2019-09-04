import React from "react"
import "./Pagination.scss"
import { Link } from "react-router-dom"

export default class Pagination extends React.Component {
  render () {
    const {meta} = this.props
    const nextPage = meta.page + 1 > meta.lastPage ? null : meta.page + 1
    const prevPage = meta.page - 1 > 0 ? meta.page - 1 : null
    if (!Object.keys(meta).length) return null
    return (
      <div className="pagination">
        <div>{prevPage && <Link to={{search: "?page=" + prevPage}}>&lang;</Link>}</div>
        <div>{meta.page}</div>
        <div>{nextPage && <Link to={{search: "?page=" + nextPage}}>&rang;</Link>}</div>
      </div>
    )
  }
}