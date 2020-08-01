import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Container from '@material-ui/core/Container'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import logo from 'assets/images/logo.jpg'

const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.modal + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
}))

export default function Header (props) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)
  const toggleDrawer = state => event => {
    setIsSidebarOpen(state)
  }
  const classes = useStyles()

  const {linksNames} = props
  return (
    <AppBar position="relative" className={['header', classes.appBar].join(' ')}>
      <Container>
        <Toolbar>
          <Hidden smUp>
            <IconButton onClick={toggleDrawer(!isSidebarOpen)}>
              <MenuIcon/>
            </IconButton>
          </Hidden>
          <Link to="/" className={'header__brand'}>
              <img src={logo} className={'header__logo'} alt="logo"/>
          </Link>
          <div style={{flexGrow: 1}}/>
          <Hidden xsDown>
            <div className="header__links-list">
              <List className="links">
                {
                  linksNames.map(el => {
                    return (
                      <Link to={`/${el}`} key={el} className={'header__link'}>
                        {el}
                      </Link>
                    )
                  })
                }
              </List>
            </div>
          </Hidden>
          <Hidden smUp>
            <Drawer className={['sidebar', classes.drawer].join(' ')}
                    classes={{
                      paper: classes.drawerPaper
                    }}
                    open={isSidebarOpen}
                    onClose={toggleDrawer(!isSidebarOpen)}>
              <div className={classes.toolbar}/>
              <List>
                {linksNames.map(el => (
                  <Link to={`/${el}`} key={el}
                        onClick={toggleDrawer(!isSidebarOpen)}
                        className={'sidebar__link'}>
                    <ListItem button>
                      <ListItemText>
                        {el}
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
          </Hidden>
        </Toolbar>
      </Container>
    </AppBar>
  )
}