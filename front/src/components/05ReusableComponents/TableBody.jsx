import React, { Component } from 'react';

class TableBody extends Component {

  handleClassName(item) {
    if (item.status === "Patvirtintas" || item.applicationStatus === "Patvirtintas") {
      return "background-green";
    } else if (item.status === "Neaktualus" || item.applicationStatus === "Neaktualus") {
      return "background-red";
    }
  }

  render() {

    const { data, columns } = this.props;

    if (data) {
      return (

        <tbody>
          {data.map(item =>
            <tr
              key={item.id}
              className={this.handleClassName(item)}
            >
              {columns.map(column =>
                <td key={item.id + column.key}>{column.content(item)}</td>
              )}
            </tr>
          )}

        </tbody>


      );

    }

  }
}

export default TableBody;