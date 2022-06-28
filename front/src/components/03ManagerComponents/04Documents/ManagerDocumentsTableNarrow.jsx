import React, { Component } from 'react'
import Table from '../../05ReusableComponents/Table';

export default class ManagerDocumentsTableNarrow extends Component {

  columns = [
    {
      key: "uploadDate",
      label: "Įkėlimo\u00a0data Naudotojo\u00a0a.k.",
      content: document => <span>{document.uploadDate} {document.userPersonalCode}</span>
    },
    {
      key: "userFirstName userLastName",
      label: `Vardas\nPavardė`,
      content: document => <span>{document.userFirstName}<br />{document.userLastName}</span>
    },
    {
      key: "name",
      label: "Dokumento pavadinimas",
      content: document => <span>{document.name}</span>
    },
    {
      key: "download",
      label: "Atsisiųsti",
      content: document => <button
        className="btn btn-outline-primary btn-sm btn-block"
        onClick={() => this.props.handleDocumentDownload(document)}
      >
        Siųstis
      </button>
    }
  ]

  render() {
    return (
      <Table
        columns={this.columns}
        data={this.props.documentList}
      />
    )
  }
}
