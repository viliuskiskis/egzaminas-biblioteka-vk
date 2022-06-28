import React, { Component } from 'react';
import KindergartenListContainer from './KindergartenListContainer';
import KindergartenInputForm from './KindergartenInputForm';

export default class KindergartenContainer extends Component {

  render() {
    return (
      <div>
        <div className="container pt-4">

          <div className="row ">
            <div className="bg-light pb-3 col-12 col-xl-3 pt-1">
              <KindergartenInputForm />
            </div>

            <div className="col-12 col-xl-9 pt-1">
              <h6 className="py-3">
                Darželių sąrašas su laisvų vietų grupėse skaičiais
              </h6>
              <KindergartenListContainer />
            </div>

          </div>
        </div>
      </div>
    )
  }
}