import React from "react";

export default function CompensationListCards(props) {

  function handleClassName(item) {
    if (item.status === "Patvirtintas" || item.applicationStatus === "Patvirtintas") {
      return "card mb-2 background-green";
    } else if (item.status === "Neaktualus" || item.applicationStatus === "Neaktualus") {
      return "card mb-2 background-red";
    } else {
      return "card mb-2";
    }
  }

  return (
    <div>
      {props.compensations.map(compensation => (
        <div className={handleClassName(compensation)} key={compensation.id}>
          <div className="card-body">

            <div className="row">
              <div className="col text-center">
                <h6>{compensation.id}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Prašymo statusas:
              </div>
              <div className="col-6 text-start">
                <b>{compensation.applicationStatus}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Pateikimo data:
              </div>
              <div className="col-6 text-start">
                <b>{compensation.submitedAt}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Vaiko asmens kodas:
              </div>
              <div className="col-6 text-start">
                <b>{compensation.childPersonalCode}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Darželio pavadinimas:
              </div>
              <div className="col-6 text-start">
                <b>{compensation.entityName}</b>
              </div>
            </div>

            <div className="d-flex pt-2">
              <button onClick={() => props.handleCompensationReview(compensation.id)}
                id="btnReviewCompensationManager"
                className="btn btn-outline-primary btn-sm btn-block me-2"
              >Peržiūrėti
              </button>
              <button
                id="btnDeactivateCompensationManager"
                className="btn btn-outline-danger btn-sm btn-block me-2"
                onClick={() => props.handleCompensationDeactivate(compensation)}
                disabled={compensation.applicationStatus !== "Pateiktas"}
              >Atmesti
              </button>
              <button
                id="btnConfirmCompensationManager"
                className="btn btn-outline-success btn-sm btn-block"
                onClick={() => props.handleCompensationConfirm(compensation)}
                disabled={compensation.applicationStatus !== "Pateiktas"}
              >Patvirtinti
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}