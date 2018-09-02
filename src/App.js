import React from "react"
import ReactDOM from "react-dom"
import moment from "moment"
import omit from "lodash/omit"
import has from "lodash/has"
import fx from "money"
import { hot } from "react-hot-loader"

import api from "@/utils/api"
import Table from "@/components/Table"

class App extends React.Component {
  state = {
    currencies: {
      base: "USD",
      date: moment().format("jj"),
      rates: {},
    },
    calculation: {
      currency: "USD",
      rate: 1.0,
      rates: {},
    },
  }
  fetchCurrencies = async () => {
    return await api()
      .get("/latest")
      .then(res => {
        this.setState({
          currencies: res.data,
        })
      })
  }
  handleRemoveRate = e => {
    e.preventDefault()
    let { calculation } = this.state
    const target = e.target.closest("button")
    calculation = {
      ...calculation,
      rates: omit(calculation.rates, target.value),
    }
    this.setState({ calculation })
  }
  handleAddRate = e => {
    e.preventDefault()
    let { calculation, currencies } = this.state
    const target = ReactDOM.findDOMNode(this.refs.addCollection)
    calculation.rates[target.value] = currencies.rates[target.value]
    this.setState({ calculation, showToggle: false })
  }

  handleChangeRate = e => {
    e.preventDefault()
    let { calculation } = this.state
    calculation.rate = e.target.value
    this.setState({ calculation })
  }
  handleChackRates = e => {
    e.preventDefault()
    this.handleCalculate()
  }
  handleCalculate = () => {
    let { currencies, calculation } = this.state
    fx.rates = currencies.rates
    const rates = Object.keys(calculation.rates).reduce((values, key) => {
      let value = {}
      value[key] = fx(calculation.rate)
        .from(key)
        .to(calculation.currency)
        .toFixed(4)
      return (values = { ...values, ...value })
    }, {})
    calculation.rates = rates
    this.setState({ calculation })
  }
  handleShowToggle = () => {
    this.setState({ showToggle: !this.state.showToggle })
  }
  componentWillMount() {
    this.fetchCurrencies().then(() => {
      let { calculation, currencies } = this.state
      calculation.rates = omit(currencies.rates, calculation.currency)
      this.setState({ calculation })
      this.handleCalculate()
    })
  }
  render() {
    const { currencies, calculation } = this.state
    const available = Object.keys(currencies.rates)
      .filter(rate => !has(calculation.rates, rate) && rate !== "USD")
      .filter(rate => rate !== "")
    return (
      <div className="row">
        <div className="col col-md-6">
          <div className="jumbotron jumbotron-fluid" style={{ height: "100%" }}>
            <div className="container text-center">
              <h1 className="display-1">{calculation.currency}</h1>
              <div className="row">
                <div className="col-6">
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        {calculation.currency}
                      </span>
                    </div>
                    <input
                      type="number"
                      className="form-control"
                      value={calculation.rate}
                      onChange={this.handleChangeRate}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <button
                      className="btn btn-primary form-control"
                      onClick={this.handleChackRates}
                    >
                      Check Rates Comparison
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-4">
          <div className="centered">
            <div
              className="btn-group dropleft"
              style={{ left: "-50px", position: "absolute" }}
            >
              <button
                onClick={this.handleShowToggle}
                className="btn btn-dark dropdown-toggle"
                data-toggle="dropdown"
                disabled={available.length <= 0}
                style={{
                  paddingTop: "8px",
                  paddingBottom: "8px",
                  margin: "2px",
                }}
              >
                <i className="material-icons">playlist_add</i>
              </button>
              <div
                className={`dropdown-menu ${
                  !!this.state.showToggle ? "show" : ""
                }`}
              >
                <div className="px-4 py-3">
                  <select
                    name="add"
                    className="form-control"
                    ref="addCollection"
                  >
                    {available.map((rate, index) => (
                      <option key={index} value={rate}>
                        {rate}
                      </option>
                    ))}
                  </select>
                  <div className="form-group" />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={this.handleAddRate}
                  >
                    <i className="material-icons">add</i> Add Collection
                  </button>
                </div>
              </div>
            </div>
            <Table>
              {Object.keys(calculation.rates).map((key, index) => {
                return (
                  <React.Fragment key={index}>
                    <Table.Header row={key}>Rate</Table.Header>
                    <Table.Header
                      row={{ value: calculation.rates[key] }}
                      renderColumn={row => row.value}
                    >
                      Currency
                    </Table.Header>
                    <Table.Header
                      row={key}
                      width="20%"
                      renderColumn={row => (
                        <button
                          className="btn btn-link"
                          onClick={this.handleRemoveRate}
                          value={row}
                        >
                          <i className="material-icons text-danger">
                            remove_circle_outline
                          </i>
                        </button>
                      )}
                    >
                      Action
                    </Table.Header>
                  </React.Fragment>
                )
              })}
            </Table>
          </div>
        </div>
      </div>
    )
  }
}
export default hot(module)(App)
