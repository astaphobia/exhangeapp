import React from "react"
import ReactDOM from "react-dom"

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
