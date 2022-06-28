import React, { Component } from "react";
import Table from "../../05ReusableComponents/Table";

export default class CompensationListTable extends Component {
  columns = [
    {
      key: 'id',
      path: 'id',
      label: 'Id',
      content: compensation => <span> {compensation.id}</span>
    },
    {
      key: 'applicationStatus',
      path: 'applicationStatus',
      label: 'Prašymo statusas',
      content: compensation => <span> {compensation.applicationStatus}</span>
    },
    {
      key: 'submitedAt',
      path: 'submitedAt',
      label: 'Pateikimo\u00a0data',
      content: compensation => <span> {compensation.submitedAt}</span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko asmens kodas',
      content: compensation => <span> {compensation.childPersonalCode}</span>
    },
    {
      key: 'childName',
      path: 'childName',
      label: 'Vaiko vardas',
      content: compensation => <span> {compensation.childName} </span>
    },
    {
      key: 'childSurname',
      path: 'childSurname',
      label: 'Vaiko pavardė',
      content: compensation => <span> {compensation.childSurname} </span>
    },
    {
      key: 'entityName',
      path: 'entityName',
      label: 'Darželio pavadinimas',
      content: compensation => <span> {compensation.entityName} </span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: compensation =>
        <div className="d-flex justify-content-center">
          <button onClick={() => this.props.handleCompensationReview(compensation.id)}
            id="btnReviewCompensationManager"
            className="btn btn-outline-primary btn-sm btn-block me-2"
          >Peržiūrėti
          </button>
          <button
            id="btnDeactivateCompensationManager"
            className="btn btn-outline-danger btn-sm btn-block me-2"
            onClick={() => this.props.handleCompensationDeactivate(compensation)}
            disabled={compensation.applicationStatus !== "Pateiktas"}
          >Atmesti
          </button>
          <button
            id="btnConfirmCompensationManager"
            className="btn btn-outline-success btn-sm btn-block"
            onClick={() => this.props.handleCompensationConfirm(compensation)}
            disabled={compensation.applicationStatus !== "Pateiktas"}
          >Patvirtinti
          </button>
        </div>
    }
  ]

  render() {
    return (
      <Table
        columns={this.columns}
        data={this.props.compensations}
      />
    )
  }

}