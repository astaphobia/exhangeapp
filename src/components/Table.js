import React from "react"
import PropTypes from "prop-types"

const Header = ({ children, width }) => <th width={width}>{children}</th>

class Table extends React.Component {
  static propTypes = {
    children: PropTypes.array,
  }
  static Header = Header
  render() {
    return (
      <table
        className="table table-hover table-striped table-bordered"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="thead-dark">
          <tr>{this.props.children[0]}</tr>
        </thead>
        <tbody>
          {React.Children.map(this.props.children, (child, index) => (
            <tr key={index}>
              {React.Children.map(child.props.children, (child, index) => {
                if (!!child.props.renderColumn) {
                  return (
                    <td key={index}>
                      {child.props.renderColumn(child.props.row)}
                    </td>
                  )
                }
                return <td key={index}>{child.props.row}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
