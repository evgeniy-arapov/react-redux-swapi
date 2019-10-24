import React from "react"
import "./Pagination.scss"
import { Link } from "react-router-dom"
import RcPagination from "rc-pagination"
import Hidden from "@material-ui/core/Hidden"

export default function Pagination ({meta}) {

  const itemRender = (current, type, element) => {
    if (type === "page") {
      return <Link to={"?page=" + current}>{current}</Link>
    }
    if (type === "next" && meta.page === current) {
      return element
    }
    if (type === "prev" && current < 1) {
      return element
    }

    return <Link to={"?page=" + current}/>
  }
    
  if (!Object.keys(meta).length) return null
  
  return (
    <div>
      <Hidden smUp>
        <RcPagination current={meta.page}
                      total={meta.count}
                      onChange={() => {}}
                      showLessItems
                      showTitle={false}
                      itemRender={itemRender}/>
      </Hidden>
      <Hidden xsDown>
        <RcPagination current={meta.page}
                      total={meta.count}
                      onChange={() => {}}
                      showTitle={false}
                      itemRender={itemRender}/>
      </Hidden>
    </div>
  )
}