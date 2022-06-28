import React from "react";

export default function QueueProcessedCards(props) {

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
                Prašymo statusas:
              </div>
              <div className="col-6 text-start">
                <b>{application.status}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Darželio pavadinimas:
              </div>
              <div className="col-6 text-start">
                <b>{application.kindergartenName}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Laukiančiųjų eilės numeris:
              </div>
              <div className="col-6 text-start">
                <b>{application.numberInWaitingList ? application.numberInWaitingList : "-"}</b>
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
                  disabled={application.status === 'Neaktualus' || application.status === 'Patvirtintas'}
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