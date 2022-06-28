import React, { Component } from "react";
import Table from "../../05ReusableComponents/Table";

export default class UserCompensationsTable extends Component {

  columns = [
    {
      key: 'submitedAt',
      path: 'submitedAt',
      label: 'Pateikimo data',
      content: compensation => <span>{compensation.submitedAt}</span>
    },
    {
      key: 'childName',
      path: 'childName',
      label: 'Vaiko vardas',
      content: compensation => <span>{compensation.childName}</span>
    },
    {
      key: 'childSurname',
      path: 'childSurname',
      label: 'Vaiko pavardė',
      content: compensation => <span>{compensation.childSurname}</span>
    },
    {
      key: 'applicationStatus',
      path: 'applicationStatus',
      label: 'Prašymo statusas',
      content: compensation => <span>{compensation.applicationStatus}</span>
    },
    {
      key: 'entityName',
      path: 'entityName',
      label: 'Darželio pavadinimas',
      content: compensation => <span>{compensation.entityName}</span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: compensation =>
        <div className="d-flex justify-content-around">
          <button
            id="btnReviewCompensationUser"
            className="btn btn-outline-primary btn-sm btn-block me-2"
            onClick={() => this.props.handleCompensationReview(compensation.id)}
          >Peržiūrėti
          </button>

          <button
            id="btnDeleteCompensation"
            className="btn btn-outline-danger btn-block btn-sm"
            onClick={() => this.props.handleCompensationDelete(compensation.id)}
          >Ištrinti
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
    );
  }
}