import React from "react";

export default function EventJournalCards(props) {

  return (
    <div>
      {props.entries.map(entry => (
        <div className="card mb-2" key={entry.id}>
          <div className="card-body">

            <div className="row">
              <div className="col text-center">
                <h6>{entry.entryID}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Laikas:
              </div>
              <div className="col-6 text-start">
                <b>{entry.eventTime.replace("T", " ").substr(0, 19)}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Naudotojo prisijungimo vardas:
              </div>
              <div className="col-6 text-start">
                <b>{entry.userName}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Naudotojo ID:
              </div>
              <div className="col-6 text-start">
                <b>{entry.userID}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Įvykis:
              </div>
              <div className="col-6 text-start">
                <b>{entry.entryMessage}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Objekto tipas:
              </div>
              <div className="col-6 text-start">
                <b>{entry.objectType}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Objekto ID:
              </div>
              <div className="col-6 text-start">
                <b>{entry.objectID}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Operacijos tipas:
              </div>
              <div className="col-6 text-start">
                <b>{entry.operationType}</b>
              </div>
            </div>

          </div>
        </div>
      ))}
    </div>
  )
}