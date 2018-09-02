import React from "react"
import PropTypes from "prop-types"
import get from "lodash/get"
import first from "lodash/first"

const Header = ({ children, width }) => (
  <th width={get(width, "")}>{children}</th>
)

class Table extends React.Component {
  static propTypes = {
    children: PropTypes.array,
  }
  static defaultProps = {
    children: [],
  }
  static Header = Header
  render() {
    return (
      <table
        className="table table-hover table-striped table-bordered"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="thead-dark">
          <tr>{first(this.props.children)}</tr>
        </thead>
        <tbody>
          {React.Children.map(this.props.children, (child, index) => (
            <tr key={index}>
              {React.Children.map(child.props.children, (child, index) => {
                if (get(child.props, "renderColumn", false)) {
                  return (
                    <td key={index}>
                      {child.props.renderColumn(get(child.props, "row", "-"))}
                    </td>
                  )
                }
                return <td key={index}>{get(child.props, "row", "-")}</td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default Table
