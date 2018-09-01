import React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.css"
import "material-design-icons/iconfont/material-icons.css"

import "@/styles/index.css"
import "@/favicon.ico"
import App from "./App"

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <App />
      </React.Fragment>
    )
  }
}
ReactDOM.render(<Root />, document.getElementById("root"))
