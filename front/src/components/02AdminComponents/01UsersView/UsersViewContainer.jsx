import React, { Component } from 'react';
import AdminCreateUserContainer from './AdminCreateUserContainer';
import UsersListContainer from './UsersListContainer';

export default class UsersViewContainer extends Component {

  render() {
    return (
      <div>
        <div className="container pt-4">

          <div className="row ">
            <div className="bg-light pb-3 col-12 col-sm-12 col-md-12 col-lg-3">
              <AdminCreateUserContainer />
            </div>

            <div className="col-12 col-sm-12 col-md-12 col-lg-9 pt-1">
              <UsersListContainer />
            </div>
          </div>

        </div>
      </div>
    )
  }
}