import React, { Component } from "react"
import debounce from "lodash/debounce"
import TextField from "@material-ui/core/TextField"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
})

class Search extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.searchInput = React.createRef()
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.resourceName !== this.props.resourceName) {
      this.searchInput.current.value = this.props.searchProp || ""
    }
  }

  debounceUpdateSearch = debounce(this.props.updateSearch, 300)

  handleChange (e) {
    this.debounceUpdateSearch(e.target.value)
  }

  render () {
    return (
      <div className={"search"}>
        <ThemeProvider theme={theme}>
          <form noValidate autoComplete="off">
            <TextField
              id="outlined-name"
              label="Search"
              defaultValue={this.props.searchProp}
              ref={this.searchInput}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
            />
          </form>
        </ThemeProvider>
      </div>
    )
  }
}

export default Search