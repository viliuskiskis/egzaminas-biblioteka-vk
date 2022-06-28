import React from "react";

export default function QueueCards(props) {

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
      {props.applications.map(application => (
        <div className={handleClassName(application)} key={application.id}>
          <div className="card-body">

            <div className="row">
              <div className="col text-center">
                <h6>{application.id}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Vaiko asmens kodas:
              </div>
              <div className="col-6 text-start">
                <b>{application.childPersonalCode}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Vaiko vardas:
              </div>
              <div className="col-6 text-start">
                <b>{application.childName}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Vaiko pavardė:
              </div>
              <div className="col-6 text-start">
                <b>{application.childSurname}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                1 prioritetas:
              </div>
              <div className="col-6 text-start">
                <b>{application.choise1 ? application.choise1 : "-"}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                2 prioritetas:
              </div>
              <div className="col-6 text-start">
                <b>{application.choise2 ? application.choise2 : "-"}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                3 prioritetas:
              </div>
              <div className="col-6 text-start">
                <b>{application.choise3 ? application.choise3 : "-"}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                4 prioritetas:
              </div>
              <div className="col-6 text-start">
                <b>{application.choise4 ? application.choise4 : "-"}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                5 prioritetas:
              </div>
              <div className="col-6 text-start">
                <b>{application.choise5 ? application.choise5 : "-"}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Statusas:
              </div>
              <div className="col-6 text-start">
                <b>{application.status}</b>
              </div>
            </div>

            <div className="d-flex mt-2">
              <button
                id="btnReviewApplicationManager"
                className="btn btn-outline-primary btn-sm btn-block me-2"
                onClick={() => props.handleApplicationReview(application.id)}
              >Peržiūrėti
              </button>

              {application.status === "Patvirtintas" &&
                <button
                  id="btnDownloadContractManager"
                  className="btn btn-outline-success btn-sm btn-block"
                  onClick={() => props.handleContractDownload(application)}
                >Parsisiųsti
                </button>
              }
              {(application.status === "Laukiantis" || application.status === "Pateiktas") &&
                <button
                  id="btnDeactivateApplication"
                  className="btn btn-outline-danger btn-sm btn-block"
                  onClick={() => props.onDeactivate(application)}
                  disabled={application.status === "Neaktualus" || application.status === "Patvirtintas"}
                >Atmesti
                </button>
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}