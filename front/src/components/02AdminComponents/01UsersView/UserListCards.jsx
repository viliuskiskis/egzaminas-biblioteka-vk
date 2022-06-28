import React from "react";

export default function UserListCards(props) {

  return (
    <div>
      {props.naudotojai.map(naudotojas => (
        <div className="card mb-2" key={naudotojas.id}>
          <div className="card-body">

            <div className="row">
              <div className="col text-center">
                <h6>{naudotojas.username}</h6>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Rolė:
              </div>
              <div className="col-6 text-start">
                <b> {naudotojas.role === "ADMIN" ?
                  "Administratorius"
                  :
                  (naudotojas.role === "USER" ?
                    "Vaiko atstovas"
                    :
                    "Švietimo specialistas")}
                </b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Vardas:
              </div>
              <div className="col-6 text-start">
                <b>{naudotojas.name}</b>
              </div>
            </div>

            <div className="row">
              <div className="col-6 text-end">
                Pavardė:
              </div>
              <div className="col-6 text-start">
                <b>{naudotojas.surname}</b>
              </div>
            </div>

            <div className="d-flex mt-2">
              {naudotojas.isRequestingPasswordReset ?
                <button
                  onClick={() => props.onRestorePassword(naudotojas)}
                  id="btnRestoreUserPassword"
                  className="btn btn-secondary btn-sm btn-block me-2">
                  <b>Atkurti</b>
                </button>
                :
                <button
                  onClick={() => props.onRestorePassword(naudotojas)}
                  id="btnRestoreUserPassword"
                  className="btn btn-outline-primary btn-sm btn-block me-2"
                >Atkurti slaptažodį
                </button>
              }
              <button
                onClick={() => props.onDelete(naudotojas)}
                id="btnDeleteUser"
                className="btn btn-outline-danger btn-sm btn-block"
              >Ištrinti naudotoją
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}