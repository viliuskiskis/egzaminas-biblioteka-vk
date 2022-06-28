import React, { Component } from "react";
import Table from "../../05ReusableComponents/Table";

export default class CompensationListTableNarrow extends Component {
  columns = [
    {
      key: 'submitedAt',
      path: 'submitedAt',
      label: 'Statusas,\nData',
      content: compensation =>
        <span>
          <span>{compensation.applicationStatus}</span>
          <br />
          <span className="no-breaks">{compensation.submitedAt}</span>
        </span>
    },
    {
      key: 'childPersonalCode',
      path: 'childPersonalCode',
      label: 'Vaiko\u00a0a.k. ',
      content: compensation =>
        <span>
          {compensation.childPersonalCode}
        </span>
    },
    {
      key: 'childName childSurname',
      path: 'childName childSurname',
      label: 'Vardas,\nPavardė',
      content: compensation =>
        <span>
          {compensation.childName}
          <br />
          {compensation.childSurname}
        </span>
    },
    {
      key: 'entityName',
      path: 'entityName',
      label: 'Darželio\npav.',
      content: compensation => <span> {compensation.entityName} </span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: compensation =>
        <div>
          <button onClick={() => this.props.handleCompensationReview(compensation.id)}
            id="btnReviewCompensationManager"
            className="btn btn-outline-primary w-100 btn-sm py-0"
          >Peržiūrėti
          </button>
          <br />
          <button
            id="btnDeactivateCompensationManager"
            className="btn btn-outline-danger w-100 btn-sm py-0"
            onClick={() => this.props.handleCompensationDeactivate(compensation)}
            disabled={compensation.applicationStatus !== "Pateiktas"}
          >Atmesti
          </button>
          <br />
          <button
            id="btnConfirmCompensationManager"
            className="btn btn-outline-success w-100 btn-sm py-0"
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