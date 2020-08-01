import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

export default function ListView ({data, renderItem, keyExtractor}) {
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