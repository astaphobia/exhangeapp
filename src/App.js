import React from "react"
import api from "@/utils/api"

class App extends React.Component {
  state = {
    currencies: {
      rates: {},
    },
  }
  fetchCurrencies = () => {
    return api()
      .get("/latest")
      .then(res => {
        this.setState({ currencies: res.data })
      })
  }
  componentWillMount() {
    this.fetchCurrencies()
  }
  render() {
    return <div className="centered text-center">Hore</div>
  }
}
export default App
