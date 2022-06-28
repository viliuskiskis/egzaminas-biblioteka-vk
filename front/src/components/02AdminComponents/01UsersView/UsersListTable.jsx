import React, { Component } from 'react';
import Table from '../../05ReusableComponents/Table';

export default class UsersListTable extends Component {

  columns = [
    {
      key: 'username',
      path: 'username',
      label: 'Naudotojo vardas',
      content: naudotojas => <span>{naudotojas.username}</span>
    },
    {
      key: 'role',
      path: 'role',
      label: 'Rolė',
      content: naudotojas =>
        <span>
          {naudotojas.role === "ADMIN" ?
            "Administratorius"
            :
            (naudotojas.role === "USER" ?
              "Vaiko atstovas"
              :
              "Švietimo specialistas")}
        </span>
    },
    {
      key: 'name',
      path: 'name',
      label: 'Vardas',
      content: naudotojas => <span>{naudotojas.name}</span>
    },
    {
      key: 'surname',
      path: 'surname',
      label: 'Pavardė',
      content: naudotojas => <span>{naudotojas.surname}</span>
    },
    {
      key: 'update',
      label: 'Pirminis slaptažodis',
      content: naudotojas => {
        if (naudotojas.isRequestingPasswordReset) {
          return (
            <button
              onClick={() => this.props.onRestorePassword(naudotojas)}
              id="btnRestoreUserPassword"
              className="btn btn-secondary btn-sm btn-block">
              <b>Atkurti</b>
            </button>
          )
        }
        else {
          return (
            <button
              onClick={() => this.props.onRestorePassword(naudotojas)}
              id="btnRestoreUserPassword"
              className="btn btn-outline-primary btn-sm btn-block"
            >Atkurti
            </button>
          )
        }
      }
    },
    {
      key: 'delete',
      label: 'Ištrinti naudotoją',
      content: naudotojas =>
        <button
          onClick={() => this.props.onDelete(naudotojas)}
          id="btnDeleteUser"
          className="btn btn-outline-danger btn-sm btn-block"
        >Ištrinti
        </button>
    }
  ]

  render() {
    const { naudotojai } = this.props;
    return (
      <Table
        columns={this.columns}
        data={naudotojai}
      />
    );
  }
}