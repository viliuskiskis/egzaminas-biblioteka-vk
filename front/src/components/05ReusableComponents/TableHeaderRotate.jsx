import React, { Component } from 'react';

export default class TableHeaderRotate extends Component {

  render() {
    return (
      <thead className="no-top-border">
        <tr >
          {this.props.columns.map(column =>
            <th
              key={column.key}
              id={column.key}
              scope="col"
              className="table-header"
            ><span className="vertical-label">
                <span>
                  {column.label}
                </span>
              </span>
            </th>)}
        </tr>
      </thead>
    );
  }
}