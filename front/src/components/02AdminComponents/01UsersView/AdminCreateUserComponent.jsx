import React from "react";
import inputValidator from '../../00Services/InputValidator';

export default function AdminCreateUserComponent(props) {

  return (
    <div >
      <h6 className="py-3">Naujo naudotojo sukūrimas</h6>
      <form onSubmit={props.handleSubmit}>

        <div className="form">
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="role-selector">Naudotojo rolė:</label>
            <select name="role-selector" id="selRole" className="form-control" value={props.state.role} onChange={props.roleDropdownOnChange}>
              <option value="ADMIN">Administratorius</option>
              <option value="MANAGER">Švietimo specialistas</option>
              <option value="USER">Vaiko atstovas</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtEmail">El. paštas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              className="form-control"
              id="txtEmail"
              name="email"
              value={props.state.email}
              placeholder="El. paštas"
              onChange={props.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            />
          </div>
        </div>

        <div className="form-group mb-3">
          <div className="form">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="txtName">Vardas <span className="fieldRequired">*</span></label>
              <input
                type="text"
                className="form-control"
                id="txtName"
                name="name"
                value={props.state.name}
                onChange={props.handleChange}
                onInvalid={(e) => inputValidator(e)}
                placeholder="Vardas"
                required
                pattern="[A-zÀ-ž\s-]{2,32}"
              />
            </div>
          </div>
          <div className="form">
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="txtSurname">Pavardė <span className="fieldRequired">*</span></label>
              <input
                type="text"
                className="form-control"
                id="txtSurname"
                name="surname"
                value={props.state.surname}
                onChange={props.handleChange}
                onInvalid={(e) => inputValidator(e)}
                placeholder="Pavardė"
                required
                pattern="[A-zÀ-ž\s-]{2,32}"
              />
            </div>
          </div>

          {props.state.role === "USER" &&
            <div>
              <div className="form">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="txtIdentificationCode">Asmens kodas <span className="fieldRequired">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtPersonalCode"
                    name="personalCode"
                    value={props.state.personalCode}
                    onChange={props.handleChange}
                    onInvalid={(e) => inputValidator(e)}
                    placeholder="Asmens kodas"
                    required
                    pattern="[0-9]{11}"
                  />
                </div>
              </div>
              <div className="form">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="txtTelNo">Telefonas <span className="fieldRequired">*</span></label>
                  <div className="input-group">

                    <input
                      type="tel"
                      className="form-control"
                      id="txtTelNo"
                      name="phone"
                      value={props.state.phone}
                      onChange={props.handleChange}
                      onInvalid={(e) => inputValidator(e)}
                      placeholder="+37012345678"
                      required pattern="[+]?[0-9]{4,17}">
                    </input>
                  </div>
                </div>
              </div>

              <div className="form">
                <div className="form-group mb-3">
                  <label className="form-label" htmlFor="txtAddress">Adresas <span className="fieldRequired">*</span></label>
                  <input
                    type="text"
                    className="form-control"
                    id="txtAddress"
                    name="address"
                    value={props.state.address}
                    onChange={props.handleChange}
                    onInvalid={(e) => inputValidator(e)}
                    placeholder="Adresas"
                    required
                  />
                </div>
              </div>
            </div>
          }

        </div>

        <h6 className="py-3">Naudotojo prisijungimai</h6>

        <div className="row">
          <div className="col-12">
            <p>Naudotojo vardas</p>
          </div>
          <div className="col-12">
            <p>{props.state.email}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p>Slaptažodis</p>
          </div>
          <div className="col-12">
            <p>{props.state.email}</p>
          </div>
        </div>
        <div className="mb-3">
          <div className="d-flex">
            <button
              id="btnClean"
              className="btn btn-outline-danger btn-block me-2"
              onClick={props.resetState}
            >Išvalyti
            </button>
            <button
              id="btnCreate"
              className="btn btn-primary btn-block"
              type="submit"
            >Sukurti
            </button>
          </div>
        </div>
      </form>

    </div>

  )
}