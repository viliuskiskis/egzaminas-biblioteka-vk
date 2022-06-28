import React from "react";

export default function KindergartenListCards(props) {

  const {
    handleUpdateCoordinates,
    isDisabled,
    onCancel,
    darzeliai,
    elderates,
    inEditMode,
    editRowId,
    errorMessages,
    hasErrors,
    onEditData,
    onSave,
    onChange,
    onDelete } = props;

  return (
    <div>
      {darzeliai.map((darzelis) => (
        <div key={darzelis.id}>
          {inEditMode && editRowId === darzelis.id ?
            (
              <div className="card mb-2">
                <div className="card-body">
                  <div className="row">
                    <div className="col text-center">
                      <input
                        type="text"
                        className="form-control form-control-sm text-center"
                        id="txtKindergartenName"
                        name="name"
                        value={darzelis.name}
                        onChange={(event) => onChange(event)}
                        placeholder="Pavadinimas"
                        title="Pavadinimas turi būti 3-50 simbolių ir negali prasidėti tarpu"
                        required
                        pattern="\S[\s\S]{2,49}"
                      />
                      {errorMessages.name && <div className="text-danger">{errorMessages.name}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end my-auto">
                      Adresas:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="txtKindergartenAddress"
                        name="address"
                        value={darzelis.address}
                        onChange={(event) => onChange(event)}
                        placeholder="Adresas"
                        title="Adresas privalomas"
                        required
                      />
                      {errorMessages.address && <div className="text-danger">{errorMessages.address}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col text-end  my-auto">
                      Koordinatės
                    </div>
                    <div className="col-6 text-start">
                      <button
                        className="btn btn-outline-primary btn-sm btn-block"
                        id="btnUpdateCoordinates"
                        onClick={() => handleUpdateCoordinates()}
                        disabled={isDisabled}
                      >
                        Atnaujinti
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Platuma:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="nmbLatitude"
                        name="latitude"
                        value={darzelis.latitude}
                        onChange={(event) => onChange(event)}
                        placeholder="Platuma"
                        title="Platuma"
                        required
                      />
                      {errorMessages.latitude && <div className="text-danger">{errorMessages.latitude}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Ilguma:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        id="nmbLongitude"
                        name="longitude"
                        value={darzelis.longitude}
                        onChange={(event) => onChange(event)}
                        placeholder="Ilguma"
                        title="Ilguma"
                        required
                      />
                      {errorMessages.longitude && <div className="text-danger">{errorMessages.longitude}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Seniūnija:
                    </div>
                    <div className="col-6 text-start">
                      <select type="text"
                        className="form-control form-control-sm"
                        id="txtKindergartenElderate"
                        name="elderate"
                        onChange={(event) => onChange(event)}
                        placeholder="Seniūnija"
                        title="Seniūnija privaloma"
                        required>
                        <option value={darzelis.elderate}>{darzelis.elderate}</option>
                        {elderates.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errorMessages.elderate && <div className="text-danger">{errorMessages.elderate}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Vietų skaičius 2-3 metų grupėje:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        className="form-control form-control-sm"
                        id="nmbCapacity2to3"
                        name="capacityAgeGroup2to3"
                        value={darzelis.capacityAgeGroup2to3}
                        onChange={(event) => onChange(event)}
                        title="Negali būti mažiau nei 0 ir daugiau nei 999"
                        required
                      />
                      {errorMessages.capacityAgeGroup2to3 && <div className="text-danger">{errorMessages.capacityAgeGroup2to3}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Vietų skaičius 3-6 metų grupėje:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="number"
                        min="0"
                        max="999"
                        className="form-control form-control-sm"
                        id="nmbCapacity3to6"
                        name="capacityAgeGroup3to6"
                        value={darzelis.capacityAgeGroup3to6}
                        onChange={(event) => onChange(event)}
                        title="Negali būti mažiau nei 0 ir daugiau nei 999"
                        required
                      />
                      {errorMessages.capacityAgeGroup3to6 && <div className="text-danger">{errorMessages.capacityAgeGroup3to6}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Direktoriaus vardas:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="txtKindergartenManagerName"
                        name="managerName"
                        value={darzelis.managerName}
                        onChange={(event) => onChange(event)}
                        placeholder="Direktoriaus vardas"
                        title="Vardą gali sudaryti raidės, tarpai ir brūkšneliai"
                        required
                        pattern="^[A-zÀ-ž\s-]{2,32}"
                      />
                      {errorMessages.managerName && <div className="text-danger">{errorMessages.managerName}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end  my-auto">
                      Direktoriaus pavardė:
                    </div>
                    <div className="col-6 text-start">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="txtKindergartenManagerSurname"
                        name="managerSurname"
                        value={darzelis.managerSurname}
                        onChange={(event) => onChange(event)}
                        placeholder="Direktoriaus pavardė"
                        title="Pavardę gali sudaryti raidės, tarpai ir brūkšneliai"
                        required
                        pattern="^[A-zÀ-ž\s-]{2,32}"
                      />
                      {errorMessages.managerSurname && <div className="text-danger">{errorMessages.managerSurname}</div>}
                    </div>
                  </div>

                  <div className="d-flex">
                    <button
                      type="submit"
                      className="btn btn-success btn-sm btn-block me-2 mt-2"
                      id="btnSaveUpdatedKindergarten"
                      onClick={() => onSave({ id: darzelis.id, item: darzelis })}
                      disabled={hasErrors}
                    >
                      Saugoti
                    </button>
                    <button
                      className="btn btn-primary btn-sm btn-block mt-2"
                      id="btnCancelUpdatedKindergarten"
                      onClick={() => onCancel()}
                    >
                      Atšaukti
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card mb-2">
                <div className="card-body">

                  <div className="row">
                    <div className="col text-center">
                      <h6>{darzelis.name}</h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Adresas:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.address}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col text-end">
                      Koordinatės
                    </div>
                    <div className="col-6 text-start">
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Platuma:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.latitude}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Ilguma:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.longitude}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Seniūnija:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.elderate}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Vietų skaičius 2-3 metų grupėje:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.capacityAgeGroup2to3}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Vietų skaičius 3-6 metų grupėje:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.capacityAgeGroup3to6}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Direktoriaus vardas:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.managerName}</b>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6 text-end">
                      Direktoriaus pavardė:
                    </div>
                    <div className="col-6 text-start">
                      <b>{darzelis.managerSurname}</b>
                    </div>
                  </div>

                  <div className="d-flex mt-2">
                    <button
                      className="btn btn-outline-primary btn-sm btn-block me-2"
                      id="btnUpdateKindergarten"
                      onClick={() => onEditData(darzelis)}>
                      Redaguoti
                    </button>
                    <br />
                    <button
                      onClick={() => onDelete(darzelis)}
                      id="btnDeleteKindergarten"
                      className="btn btn-outline-danger btn-sm btn-block">
                      Ištrinti
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      ))}
    </div>
  )
}