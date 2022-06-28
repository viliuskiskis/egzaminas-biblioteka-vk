import React from "react";
import inputValidator from "../../00Services/InputValidator";

export default function ChildFormComponent(props) {

  let datePresent = props.hiddenChildSurname === "" ? "form-control" : "form-control green-background";
  let namePresent = props.childName === "" ? "form-control" : "form-control green-background";

  return (
    <div>
      <div className="form">
        <div className="formHeader application-form-header">
          <h6>Vaiko duomenys</h6>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildPersonalCode"
            name="childPersonalCode"
            placeholder="Asmens kodas"
            className="form-control"
            value={props.childPersonalCode}
            onChange={(event) => props.childAkOnChange(event)}
            required
            onInvalid={(e) => inputValidator(e)}
            pattern="[56][12][0-9][01][0-9][0-3][0-9]{5}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildSurname">
            Vaiko pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildSurname"
            name="childSurname"
            placeholder="Vaiko pavardė"
            className="form-control"
            value={props.childSurname}
            onChange={(event) => props.childSurnameOnChange(event)}
            required
            onInvalid={(e) => inputValidator(e)}
            pattern="^[A-zÀ-ž\s-]{2,32}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildName">
            Vaiko vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtChildName"
            name="childName"
            placeholder="Vaiko vardas"
            className={namePresent}
            value={props.childName}
            required
            onInvalid={(e) => inputValidator(e)}
            pattern="^[A-zÀ-ž\s-]{2,32}"
            disabled={true}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtChildBirthdate">
            Gimimo data <span className="fieldRequired">*</span>
          </label>
          <input
            id="txtChildBirthdate"
            className={datePresent}
            name="birthdate"
            value={props.birthdate}
            placeholder="Gimimo data"
            disabled={true}
          />
        </div>
      </div>
    </div>
  )
}