import React, { Component } from "react"

class ShowItem extends Component {
  render () {
    const {data} = this.props
    return (
      <div>
        {Object.keys(data).map(el => {
          return <div key={el}>{`${el}: ${data[el]}`}</div>
        })}
      </div>
    )
  }
}

export default ShowItem