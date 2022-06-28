import React from "react";

export default function UserApplicationsCards(props) {

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
                <h6>{application.childName} {application.childSurname}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Pateikimo data:
              </div>
              <div className="col-6 text-start">
                <b>{application.submitedAt}</b>
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

            {/* Show this if status is "Patvirtintas" */}
            {application.status === "Patvirtintas" &&
              <div className="row">
                <div className="col-6 text-end">
                  Priimta į darželį:
                </div>
                <div className="col-6 text-start">
                  <b>{application.kindergartenName}</b>
                </div>
              </div>
            }
            {/* Show this if status is "Laukiantis" */}
            {application.status === "Laukiantis" &&
              <div className="row">
                <div className="col-6 text-end">
                  Laukiančiųjų eilės nr.:
                </div>
                <div className="col-6 text-start">
                  <b>{application.numberInWaitingList}</b>
                </div>
              </div>
            }
            <div className="d-flex mt-2">
              {/* Show this button, if application status is NOT "Parvirtintas" */}
              {application.status !== "Patvirtintas" &&
                <button
                  onClick={() => props.handleApplicationReview(application)}
                  id="btnReviewCompensation"
                  className="btn btn-outline-primary btn-sm btn-block me-2"
                >Peržiūrėti
                </button>
              }
              {/* Show this button, if application status is "Parvirtintas" */}
              {application.status === "Patvirtintas" &&
                <button
                  onClick={() => props.handleKindergartenContract(application.id)}
                  id="btnReviewContractUser"
                  className="btn btn-outline-success btn-block btn-sm me-2"
                >Pasirašymui
                </button>
              }
              <button
                onClick={() => props.handleApplicationDelete(application.id)}
                id="btnDeleteApplication"
                className="btn btn-outline-danger btn-block btn-sm"
              >Ištrinti
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}