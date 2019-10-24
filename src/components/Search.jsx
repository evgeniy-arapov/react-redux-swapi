import React, { useState, useEffect, useCallback } from "react"
import debounce from "lodash/debounce"
import TextField from "@material-ui/core/TextField"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
})

export default function Search ({resourceName, searchProp, updateSearch}) {
  let [searchString, setSearchString] = useState("")
  
  const debouncedUpdateSearch = useCallback(debounce(updateSearch, 300), []) 
  
  useEffect(() => {
    debouncedUpdateSearch(searchString)
  }, [searchString, debouncedUpdateSearch])

  function handleChange (e) {
    setSearchString(e.target.value)
  }

  return (
    <div className={"search"}>
      <ThemeProvider theme={theme}>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Search"
            defaultValue={searchProp}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
          />
        </form>
      </ThemeProvider>
    </div>
  )
}