import React from "react";
import inputValidator from "../../00Services/InputValidator";

export default function MainGuardianFormComponent(props) {

  return (
    <div>
      <div className="form">
        <div className="formHeader application-form-header">
          <h6>Globėjo duomenys</h6>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtName">
            Vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainName"
            name="name"
            placeholder="Vardas"
            className="form-control"
            value={props.mainGuardian.name}
            onChange={(e) => props.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={props.registrationDisabled}
            required
            pattern="[A-zÀ-ž\s-]{2,32}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtSurname">
            Pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainSurname"
            name="surname"
            placeholder="Pavardė"
            className="form-control"
            value={props.mainGuardian.surname}
            onChange={(e) => props.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={props.registrationDisabled}
            required
            pattern="[A-zÀ-ž\s-]{2,32}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainPersonalCode"
            name="personalCode"
            placeholder="Asmens kodas"
            className="form-control"
            value={props.mainGuardian.personalCode}
            onChange={(e) => props.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={props.registrationDisabled}
            required
            pattern="[0-9]{11}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtTelNo">
            Telefonas <span className="fieldRequired">*</span>
          </label>
          <div className="input-group">
            <input
              type="tel"
              id="txtMainPhone"
              name="phone"
              placeholder="+37012345678"
              className="form-control"
              value={props.mainGuardian.phone}
              onChange={(e) => props.mainGuardianOnChange(e)}
              onInvalid={(e) => inputValidator(e)}
              disabled={props.registrationDisabled}
              required
              pattern="[+]?[0-9]{4,17}"
            ></input>
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtEmail">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtMainEmail"
            name="email"
            placeholder="El. paštas"
            className="form-control"
            value={props.mainGuardian.email}
            onChange={(e) => props.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={props.registrationDisabled}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtAddress">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="txtMainAddress"
            name="address"
            placeholder="Adresas"
            value={props.mainGuardian.address}
            onChange={(e) => props.mainGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={props.registrationDisabled}
            required
          />
        </div>
      </div>
    </div>
  )
}