import React from "react";

export default function ManagerDocumentsCards(props) {

  return (
    <div>
      {props.documentList.map(document => (
        <div className="card mb-2" key={document.id}>
          <div className="card-body">

            <div className="row">
              <div className="col text-center">
                <h6>{document.name}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Įkėlimo data:
              </div>
              <div className="col-6 text-start">
                <b>{document.uploadDate}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Naudotojo asmens kodas:
              </div>
              <div className="col-6 text-start">
                <b>{document.userPersonalCode}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Naudotojo vardas:
              </div>
              <div className="col-6 text-start">
                <b>{document.userFirstName}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Naudotojo pavardė:
              </div>
              <div className="col-6 text-start">
                <b>{document.userLastName}</b>
              </div>
            </div>

            <button
              className="btn btn-outline-primary btn-sm btn-block mt-2"
              onClick={() => props.handleDocumentDownload(document)}
            >
              Atsisiųsti
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}