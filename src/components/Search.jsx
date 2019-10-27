import React from "react"
import debounce from "lodash/debounce"
import TextField from "@material-ui/core/TextField"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
})

export default function Search ({resourceName, isSearch, searchString, updateSearch}) {
  const debouncedUpdateSearch = debounce(updateSearch, 300)
  
  function handleChange (e) {
    debouncedUpdateSearch(e.target.value)
  }

  return (
    <div className={"search"}>
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off">
          <TextField
            key={resourceName}
            label="Search"
            defaultValue={isSearch ? searchString : ""}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </form>
      </ThemeProvider>
    </div>
  )
}