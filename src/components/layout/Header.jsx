import React from "react"
import { Link } from "react-router-dom"
import "./Header.scss"

export default class Header extends React.Component {
  render () {
    const {linksNames} = this.props
    return (
      <div className="container">
        <header>
          <div>Header</div>
          <div>
            {linksNames.map(el => {
              return (
                <Link to={`/${el}`} key={el}>{el}</Link>
              )
            })}
          </div>
        </header>
      </div>
    )
  }
}