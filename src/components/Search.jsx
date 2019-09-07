import React, { Component } from "react"
import debounce from "lodash/debounce"

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
      <div>
        <form>
          <label>
            Search:
            <br/>
            <input type="text"
                   onChange={this.handleChange}
                   ref={this.searchInput}
                   name="searchStr"/>
          </label>
        </form>
      </div>
    )
  }
}

export default Search