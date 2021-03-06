import React, { Component } from 'react';

export default class TableHeader extends Component {

  render() {
    return (
      <thead className="no-top-border">
        <tr >
          {this.props.columns.map(column =>
            <th
              key={column.key}
              id={column.key}
              scope="col">
              {column.label}
            </th>)}
        </tr>

      </thead>
    );
  }
}