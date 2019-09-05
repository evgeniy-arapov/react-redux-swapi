import React, { Component } from "react"

class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchStr: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevProps.searchProp !== this.props.searchProp) {
      this.setState({
        searchStr: this.props.searchProp || ""
      })
    }
  }

  handleChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.updateSearch(this.state.searchStr)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Search: <button>Search</button>
            <br/>
            <input type="text"
                   onChange={this.handleChange}
                   name="searchStr"
                   value={this.state.searchStr}/>
          </label>
        </form>
      </div>
    )
  }
}

export default Search