import React from "react"
import { Link } from "react-router-dom"
import { upperFirst, lowerCase } from "lodash"
import "./ShowItem.scss"

export default function ShowItem ({data}) {
  const privateFields = ["id", "created", "edited", "relatedProps", "url"]
  
  function renderLinkItem (item) {
    const [, id, name] = item.url.split("/").reverse()
    return <Link to={`/${name}/${id}`}>{item.name || item.title}</Link>
  }

  function renderArray (array) {
    if (!array.length) return "Not have"
    return array.map(el => {
      return <div key={el.id}>{renderLinkItem(el)}</div>
    })
  }

  function renderRelation (option) {
    if (option instanceof Array) {
      return renderArray(option)
    }
    return renderLinkItem(option)
  }
  
  return (
    <div className={"show-item"}>
      {Object.keys(data).filter(key => !privateFields.includes(key))
        .map(el => {
          if (el === "name" || el === "title") {
            return <h2 key={el} className={"show-item__title"}>{data[el]}</h2>
          }
          return (
            <div key={el} className={"show-item__prop"}>
              <div className={"show-item__prop-name"}>
                {upperFirst(lowerCase(el)) + ":"}
              </div>
              <div className={"show-item__prop-value"}>
                {
                  data.relatedProps.includes(el) ?
                    renderRelation(data[el]) :
                    data[el]
                }
              </div>
            </div>
          )
        })}
    </div>
  )}