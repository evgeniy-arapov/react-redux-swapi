import React, { Component } from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"

class ListView extends Component {
  render () {
    const {data, renderItem, keyExtractor} = this.props

    return (
      <List>
        {
          data.map(el => {
            return (
              <ListItem key={keyExtractor(el)}>
                <ListItemText>
                  {renderItem(el)}
                </ListItemText>
              </ListItem>
            )
          })
        }
      </List>
    )
  }
}

export default ListView