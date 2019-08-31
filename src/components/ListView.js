import React, { Component } from "react"

class ListView extends Component {
  render () {
    const {data, renderItem, keyExtractor} = this.props

    return (
      <div>
        {
          data.map(el => {
            return (
              <div key={keyExtractor(el)}>
                {renderItem(el)}
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default ListView