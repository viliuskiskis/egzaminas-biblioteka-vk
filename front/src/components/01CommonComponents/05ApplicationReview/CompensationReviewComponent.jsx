import React from "react";

export default function CompensationReviewComponent(props) {

  return (
    <div className="container pt-4" >
      <div className="row">

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Prašymas skirti kompensaciją privačiam darželiui</h6>
          <div className="pb-4">
            <span>Pateikimo data:<b> {props.state.submitedAt}</b></span><br />
            <span>Prašymo statusas:<b> {props.state.applicationStatus}</b></span><br />
          </div>

          <h6>Vaiko duomenys</h6>
          <div>
            <span>Vardas:<b> {props.state.childName}</b></span><br />
            <span>Pavardė:<b> {props.state.childSurname}</b></span><br />
            <span>Asmens kodas:<b> {props.state.childPersonalCode}</b></span><br />
            <span>Gimimo data:<b> {props.state.birthdate}</b></span><br />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Ugdymo įstaigos duomenys</h6>
          {props.state.kindergartenData !== null &&
            <div>
              <span>Pavadinimas:<b> {props.state.kindergartenData.entityName}</b></span><br />
              <span>Įmonės kodas:<b> {props.state.kindergartenData.code}</b></span><br />
              <span>Telefonas:<b> {props.state.kindergartenData.phone}</b></span><br />
              <span>El. paštas:<b> {props.state.kindergartenData.email}</b></span><br />
              <span>Adresas:<b> {props.state.kindergartenData.address}</b></span><br />
              <span>Banko sąskaitos numeris:<b> {props.state.kindergartenData.account}</b></span><br />
              <span>Banko kodas:<b> {props.state.kindergartenData.bankCode}</b></span><br />
              <span>Banko pavadinimas:<b> {props.state.kindergartenData.bankName}</b></span><br />
            </div>
          }
        </div>

        <div className="col-12 col-md-6 col-lg-4 pb-4">
          <h6>Globėjo duomenys</h6>
          {props.state.mainGuardian !== null &&
            <div>
              <span>Vardas:<b> {props.state.mainGuardian.name}</b></span><br />
              <span>Pavardė:<b> {props.state.mainGuardian.surname}</b></span><br />
              <span>Asmens kodas:<b> {props.state.mainGuardian.personalCode}</b></span><br />
              <span>Telefonas:<b> {props.state.mainGuardian.phone}</b></span><br />
              <span>El. paštas:<b> {props.state.mainGuardian.email}</b></span><br />
              <span>Adresas:<b> {props.state.mainGuardian.address}</b></span><br />
            </div>
          }
        </div>
      </div>

      <div className="row">
        <div className="d-flex">
          {/* Show this button only for USER */}
          {props.role === "USER" &&
            <button
              id="CompensationReviewDelete"
              className="btn btn-outline-danger me-2 btn-block"
              onClick={props.handleDelete}
            >Ištrinti
            </button>
          }

          <button
            id="CompensationReviewReturn"
            className="btn btn-outline-success btn-block"
            onClick={props.handleReturn}
          >Grįžti
          </button>
        </div>
      </div>
    </div >

  )
}