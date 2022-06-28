import React, { Component } from 'react';
import Table from '../../05ReusableComponents/Table';

export default class QueueTable extends Component {

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
      label: 'Vaiko asmens kodas',
      content: application => <span> {application.childPersonalCode} </span>
    },
    {
      key: 'name',
      path: 'name',
      label: 'Vaiko vardas',
      content: application => <span> {application.childName} </span>
    },
    {
      key: 'surname',
      path: 'surname',
      label: 'Vaiko pavardė',
      content: application => <span> {application.childSurname} </span>
    },
    {
      key: 'choiseName1',
      path: 'choiseName1',
      label: '1\u00a0prioritetas',
      content: application => <span> {application.choise1 ? application.choise1 : "-"} </span>
    },
    {
      key: 'choiseName2',
      path: 'choiseName2',
      label: '2\u00a0prioritetas',
      content: application => <span> {application.choise2 ? application.choise2 : "-"} </span>
    },
    {
      key: 'choiseName3',
      path: 'choiseName3',
      label: '3\u00a0prioritetas',
      content: application => <span> {application.choise3 ? application.choise3 : "-"} </span>
    },
    {
      key: 'choiseName4',
      path: 'choiseName4',
      label: '4\u00a0prioritetas',
      content: application => <span> {application.choise4 ? application.choise4 : "-"} </span>
    },
    {
      key: 'choiseName5',
      path: 'choiseName5',
      label: '5\u00a0prioritetas',
      content: application => <span> {application.choise5 ? application.choise5 : "-"} </span>
    },
    {
      key: 'status',
      label: 'Statusas',
      content: application => <span>{application.status}</span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: application =>
        <div className="d-flex justify-content-center">
          <button
            id="btnReviewApplicationManager"
            className="btn btn-outline-primary btn-sm btn-block me-2"
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
              disabled={application.status === "Neaktualus" || application.status === "Patvirtintas"}
            >Atmesti
            </button>
          }
        </div>
    },
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