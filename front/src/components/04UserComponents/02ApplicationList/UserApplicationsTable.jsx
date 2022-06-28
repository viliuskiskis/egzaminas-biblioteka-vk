import React, { Component } from 'react';
import Table from '../../05ReusableComponents/Table';

export default class UserApplicationsTable extends Component {

  columns = [
    {
      key: 'date',
      path: 'date',
      label: 'Pateikimo data',
      content: application => <span>{application.submitedAt}</span>
    },
    {
      key: 'childName',
      path: 'childName',
      label: 'Vaiko vardas',
      content: application => <span>{application.childName}</span>
    },
    {
      key: 'childSurname',
      path: 'childSurname',
      label: 'Vaiko pavardė',
      content: application => <span>{application.childSurname}</span>
    },
    {
      key: 'status',
      path: 'status',
      label: 'Prašymo statusas',
      content: application => <span>{application.status} </span>
    },
    {
      key: 'kindergarten',
      path: 'kindergarten',
      label: 'Priimta į darželį',
      content: application =>
        <span>
          {application.status === 'Patvirtintas' ? <span>{application.kindergartenName}</span> : <span>-</span>}
        </span>
    },
    {
      key: 'waiting',
      path: 'waiting',
      label: 'Laukiančiųjų eilės numeris',
      content: application =>
        <span>
          {application.status === 'Laukiantis' ? <span>{application.numberInWaitingList}</span> : <span>-</span>}
        </span>
    },
    {
      key: 'veiksmai',
      label: 'Veiksmai',
      content: application =>
        <div className="d-flex justify-content-center">
          {application.status !== "Patvirtintas" &&
            <button
              onClick={() => this.props.handleApplicationReview(application)}
              id="btnReviewCompensation"
              className="btn btn-outline-primary btn-sm btn-block me-2"
            >Peržiūrėti
            </button>
          }

          {/* Show this button, if application status is "Parvirtintas" */}
          {application.status === "Patvirtintas" &&
            <button
              id="btnReviewContractUser"
              className="btn btn-success btn-block btn-sm me-2"
              onClick={() => this.props.handleKindergartenContract(application.id)}
            >Pasirašymui
            </button>
          }

          <button onClick={() => this.props.handleApplicationDelete(application.id)}
            id="btnDeleteApplication"
            className="btn btn-outline-danger btn-block btn-sm"
          >Ištrinti
          </button>
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