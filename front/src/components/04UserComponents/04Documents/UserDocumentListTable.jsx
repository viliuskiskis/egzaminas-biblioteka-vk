import React, { Component } from 'react'
import Table from '../../05ReusableComponents/Table';

export default class UserDocumentListTable extends Component {

  columns = [
    {
      key: "uploadDate",
      label: "Įkėlimo\u00a0data",
      content: document => <span>{document.uploadDate}</span>
    },
    {
      key: "name",
      label: "Pavadinimas",
      content: document => <span>{document.name}</span>
    },
    {
      key: "download",
      label: "Veiksmai",
      content: document =>
        <div className="d-flex">
          <button
            className="btn btn-primary btn-sm btn-block me-2"
            onClick={() => this.props.onDownload(document)}
          >
            Atsisiųsti
          </button>
          <button
            className="btn btn-outline-danger btn-sm btn-block"
            onClick={() => this.props.onDelete(document)}
          >
            Ištrinti
          </button>
        </div>
    }
  ]

  render() {
    const { documents } = this.props;
    return (
      <Table
        columns={this.columns}
        data={documents}
      />
    )
  }
}
