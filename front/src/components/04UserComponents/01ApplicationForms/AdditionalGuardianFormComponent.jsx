import React from "react";
import inputValidator from "../../00Services/InputValidator";

export default function AdditionalGuardianFormComponent(props) {

  return (
    <div>
      <div className="form">
        <div className="formHeader application-form-header row">
          <div className="col-8 col-xl-7 col-xxl-6">
            <h6>Kito globėjo duomenys</h6>
          </div>
          <div className="col-4 col-xl-5 col-xxl-6">
            <button
              id="btnEnableAdditionalGuardian"
              className="btn btn-primary btn-sm btn-block float-end"
              onClick={props.enableAdditionalGuardian}
              disabled={props.registrationDisabled}
            >
              {!props.additionalGuardianInput ? "Pridėti" : "Pašalinti"}
            </button>
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtName">
            Vardas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalName"
            name="name"
            placeholder="Vardas"
            className="form-control"
            value={props.additionalGuardian.name}
            onChange={(e) => props.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!props.additionalGuardianInput || props.registrationDisabled}
            pattern="[A-zÀ-ž\s-]{2,32}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtSurname">
            Pavardė <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalSurname"
            name="surname"
            placeholder="Pavardė"
            className="form-control"
            value={props.additionalGuardian.surname}
            onChange={(e) => props.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!props.additionalGuardianInput || props.registrationDisabled}
            pattern="[A-zÀ-ž\s-]{2,32}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtPersonalCode">
            Asmens kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalPersonalCode"
            name="personalCode"
            placeholder="Asmens kodas"
            className="form-control"
            value={props.additionalGuardian.personalCode}
            onChange={(e) => props.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!props.additionalGuardianInput || props.registrationDisabled}
            pattern="[0-9]{11}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtTelNo">
            Telefonas <span className="fieldRequired">*</span>
          </label>
          <div className="input-group">
            <input
              type="tel"
              id="txtAdditionalPhone"
              name="phone"
              placeholder="+37012345678"
              className="form-control"
              value={props.additionalGuardian.phone}
              onChange={(e) => props.additionalGuardianOnChange(e)}
              onInvalid={(e) => inputValidator(e)}
              disabled={!props.additionalGuardianInput || props.registrationDisabled}
              pattern="[+]?[0-9]{4,17}"
              required
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtEmail">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="txtAdditionalEmail"
            name="email"
            placeholder="El. paštas"
            className="form-control"
            value={props.additionalGuardian.email}
            onChange={(e) => props.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!props.additionalGuardianInput || props.registrationDisabled}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="txtAddress">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="txtAdditionalAddress"
            name="address"
            placeholder="Adresas"
            value={props.additionalGuardian.address}
            onChange={(e) => props.additionalGuardianOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            disabled={!props.additionalGuardianInput || props.registrationDisabled}
            required
          />
        </div>
      </div>
    </div>
  )
}