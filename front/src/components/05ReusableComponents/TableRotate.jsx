import React from 'react';
import TableBody from './TableBody';
import TableHeaderRotate from './TableHeaderRotate';

const TableRotate = (props) => {
  const { columns, data } = props;

  return (
    <div className="table-responsive-md">

      <table className="table">

        <TableHeaderRotate
          columns={columns}
        />

        <TableBody
          columns={columns}
          data={data}
        />

      </table>
    </div>

  );
}

export default TableRotate;