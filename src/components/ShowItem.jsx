import React, { Component } from "react"
import { Link } from "react-router-dom"

class ShowItem extends Component {
  renderLinkItem (item) {
    const [, id, name] = item.url.split("/").reverse()
    return <Link to={`/${name}/${id}`}>{item.name || item.title}</Link>
  }

  renderArray (array) {
    if (!array.length) return "Not have"
    return array.map(el => {
      return <div key={el.id}>{this.renderLinkItem(el)}</div>
    })
  }

  renderRelation (option) {
    if (option instanceof Array) {
      return this.renderArray(option)
    }
    return this.renderLinkItem(option)
  }

  render () {
    const {data} = this.props
    const privateFields = ["id", "created", "edited", "relatedProps", "url"]
    return (
      <div>
        {Object.keys(data).filter(key => !privateFields.includes(key))
          .map(el => {
            return (
              <div key={el} style={{display: "flex", border: "1px solid gray", width: "450px"}}>
                <div style={{width: "120px", textAlign: "left"}}>{`${el}:`}</div>
                <div style={{display: "flex", flexDirection: "column", marginLeft: "10px"}}>
                  {
                    data.relatedProps.includes(el) ?
                      this.renderRelation(data[el]) :
                      `${data[el]}`
                  }
                </div>
              </div>
            )
          })}
      </div>
    )
  }
}

export default ShowItem