import React from "react";
import inputValidator from "../../00Services/InputValidator";

export default function KindergartenFormComponent(props) {

  return (
    <div>
      <div className="form">
        <h6 className="formHeader">Ugdymo įstaigos duomenys</h6>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenName">
            Pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="kindergartenName"
            name="entityName"
            placeholder="Pavadinimas"
            className="form-control"
            value={props.kindergartenData.entityName}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[A-Za-zĄ-Žą-ž0-9\s\-]{2,50}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenCode">
            Įmonės kodas <span className="fieldRequired">*</span>
          </label>
          <input
            type="tel"
            id="kindergartenCode"
            name="code"
            placeholder="Įmonės kodas"
            className="form-control"
            value={props.kindergartenData.code}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[0-9]{9}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenPhone">
            Telefonas <span className="fieldRequired">*</span>
          </label>
          <div className="input-group">
            <input
              type="tel"
              id="kindergartenPhone"
              name="phone"
              placeholder="+37012345678"
              className="form-control"
              value={props.kindergartenData.phone}
              onChange={(e) => props.kindergartenOnChange(e)}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[+]?[0-9]{4,17}"
            ></input>
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenEmail">
            El. paštas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="kindergartenEmail"
            name="email"
            placeholder="El. paštas"
            className="form-control"
            value={props.kindergartenData.email}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenAddress">
            Adresas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="kindergartenAddress"
            name="address"
            placeholder="Adresas"
            value={props.kindergartenData.address}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[A-Za-zĄ-Žą-ž0-9'\s.,-]{2,50}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenAccount">
            Banko sąskaitos numeris (IBAN) <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="kindergartenAccount"
            name="account"
            placeholder="Banko sąskaitos numeris"
            className="form-control"
            value={props.kindergartenData.account}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[A-Za-z]{2}[0-9]{2}[A-z0-9]{11,30}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenBankCode">
            Banko kodas (BIC/SWIFT) <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="kindergartenBankCode"
            name="bankCode"
            placeholder="Banko kodas"
            className="form-control"
            value={props.kindergartenData.bankCode}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[A-Za-z]{6}[A-Za-z0-9]{2,5}"
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="kindergartenBankName">
            Banko pavadinimas <span className="fieldRequired">*</span>
          </label>
          <input
            type="text"
            id="kindergartenBankName"
            name="bankName"
            placeholder="Banko pavadinimas"
            className="form-control"
            value={props.kindergartenData.bankName}
            onChange={(e) => props.kindergartenOnChange(e)}
            onInvalid={(e) => inputValidator(e)}
            required
            pattern="[A-Za-zĄ-Žą-ž0-9\s\-]{2,50}"
          />
        </div>
      </div>
    </div>
  )
}