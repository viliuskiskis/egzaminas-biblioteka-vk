import React, { Component } from 'react';
import Table from '../../05ReusableComponents/Table';

export default class QueueProcessedTableNarrow extends Component {
  columns = [
    {
      key: 'id',
      path: 'id',
      label: 'Id',
      content: application => <span> {application.id}</span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko a.k.',
      content: application => <span> {application.childPersonalCode}</span>
    },
    {
      key: 'name',
      path: 'name',
      label: 'Vardas, pavardė',
      content: application =>
        <span>
          {application.childName}
          <br />
          {application.childSurname}
        </span>
    },
    {
      key: 'status',
      path: 'status',
      label: 'Statusas',
      content: application => <span> {application.status ? application.status : "-"} </span>
    },
    {
      key: 'kindergartenName',
      path: 'kindergartenName',
      label: 'Darželis',
      content: application => <span> {application.kindergartenName ? application.kindergartenName : "-"} </span>
    },
    {
      key: 'numberInWaitingList',
      path: 'numberInWaitingList',
      label: 'Eilės nr.',
      content: application => <span> {application.numberInWaitingList ? application.numberInWaitingList : "-"} </span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: application =>
        <div>
          <button
            id="btnReviewApplicationManager"
            className="btn btn-outline-primary btn-sm btn-block mb-2"
            onClick={() => this.props.handleApplicationReview(application.id)}
          >Peržiūrėti
          </button>

          {application.status === "Patvirtintas" &&
            <button
              id="btnDownloadContractManager"
              className="btn btn-outline-success btn-sm btn-block"
              onClick={() => this.props.handleContractDownload(application)}
            >Parsisiųsti
            </button>
          }
          {(application.status === "Laukiantis" || application.status === "Pateiktas") &&
            <button
              id="btnDeactivateApplication"
              className="btn btn-outline-danger btn-sm btn-block"
              onClick={() => this.props.onDeactivate(application)}
              disabled={application.status === 'Neaktualus' || application.status === 'Patvirtintas'}
            >Atmesti
            </button>
          }
        </div>
    }
  ]

  render() {
    return (
      <Table
        columns={this.columns}
        data={this.props.applications}
      />
    );
  }
}


