import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "store"
import "./index.scss"
import App from "./containers/App"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from '@material-ui/styles';
import * as serviceWorker from './serviceWorker';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#424242"
    },
    secondary: {
      main: "rgb(1255,0,0)"
    },
    type: "dark"
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200
    }
  }
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root")
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()