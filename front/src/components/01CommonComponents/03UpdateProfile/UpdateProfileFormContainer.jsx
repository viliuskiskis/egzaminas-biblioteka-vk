import React, { Component } from 'react';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import inputValidator from '../../00Services/InputValidator';
import swal from 'sweetalert';
import DownloaderContainer from './DownloaderContainer';
import ForgetMe from './ForgetMe';

export default class UpdateProfileFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      name: "",
      surname: "",
      personalCode: "",
      address: "",
      phone: "",
      email: "",
      passwordUpdate: false,
      oldPassword: "",
      newPassword: "",
      newPasswordRepeat: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdatePasswordButton = this.handleUpdatePasswordButton.bind(this);
    this.handleUpdatePasswordSubmit = this.handleUpdatePasswordSubmit.bind(this);
  }

  componentDidMount() {
    http.get(`${apiEndpoint}/api/users/user`)
      .then((response) => {
        if (response.data.role === "USER") {
          this.setState({
            role: response.data.role,
            name: response.data.name,
            surname: response.data.surname,
            personalCode: response.data.personalCode,
            address: response.data.address,
            phone: response.data.phone,
            email: response.data.email,
            username: response.data.username
          })
        } else {
          this.setState({
            role: response.data.role,
            name: response.data.name,
            surname: response.data.surname,
            personalCode: response.data.personalCode,
            address: response.data.address,
            phone: response.data.phone,
            email: response.data.email,
            username: response.data.username
          })
        }
      }).catch((error) => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio.",
          button: "Gerai"
        })
      })
  }

  /** Update user info form */
  drawUpdateForm(role) {
    /** Admin & Manager form */
    if (role !== "USER") {
      return (
        <div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtName">Vardas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtName"
              name="name"
              placeholder="Vardas"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[A-zÀ-ž\s-]{2,32}"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtSurname">Pavardė <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtSurname"
              name="surname"
              placeholder="Pavardė"
              className="form-control"
              value={this.state.surname}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[A-zÀ-ž\s-]{2,32}"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtEmail">El. paštas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtEmail"
              name="email"
              placeholder="El. paštas"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            />
          </div>
        </div>
      )
    }

    /** User form */
    else {
      return (
        <div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtName">Vardas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtName"
              name="name"
              placeholder="Vardas"
              className="form-control"
              value={this.state.name}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[A-zÀ-ž\s-]{2,32}"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtSurname">Pavardė <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtSurname"
              name="surname"
              placeholder="Pavardė"
              className="form-control"
              value={this.state.surname}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[A-zÀ-ž\s-]{2,32}"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtPersonalCode">Asmens kodas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtPersonalCode"
              name="personalCode"
              placeholder="Asmens kodas"
              className="form-control"
              value={this.state.personalCode}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[0-9]{11}"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtTelNo">Telefonas <span className="fieldRequired">*</span></label>
            <div className="input-group">
              <input
                type="tel"
                className="form-control"
                id="txtTelNo"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                placeholder="+37012345678"
                required pattern="[+]?[0-9]{4,17}">
              </input>
            </div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtEmail">El. paštas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              id="txtEmail"
              name="email"
              placeholder="El. paštas"
              className="form-control"
              value={this.state.email}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="txtAddress">Adresas <span className="fieldRequired">*</span></label>
            <input
              type="text"
              className="form-control"
              id="txtAddress"
              name="address"
              placeholder="Adresas"
              value={this.state.address}
              onChange={this.handleChange}
              onInvalid={(e) => inputValidator(e)}
              required
            />
          </div>
        </div>
      )
    }
  }

  /** Change handler */
  handleChange(e) {
    inputValidator(e);
    this.setState({
      [e.target.name]: e.target.name === "email" ? e.target.value.toLowerCase() : e.target.value
    })
  }

  /** Submit handler */
  handleSubmit(e) {
    e.preventDefault();
    http.put(`${apiEndpoint}/api/users/update`, {
      "address": this.state.address,
      "email": this.state.email,
      "name": this.state.name,
      "password": this.state.password,
      "personalCode": this.state.personalCode,
      "phone": this.state.phone,
      "role": this.state.role,
      "surname": this.state.surname,
      "username": this.state.username
    })
      .then((response) => {
        swal({
          text: "Naudotojo duomenys buvo sėkmingai atnaujinti",
          button: "Gerai"
        })
      })
      .catch((error) => {
        swal({
          text: error.response.data,
          button: "Gerai"
        })
      })
  }

  /**Update password form */
  drawUpdatePasswordForm() {
    if (this.state.passwordUpdate) {
      return (
        <div className="form">
          <form onSubmit={this.handleUpdatePasswordSubmit}>
            <div className="form-group mb-3">
              <label className="form-label" htmlFor="txtOldPassword">Senas slaptažodis <span className="fieldRequired">*</span></label>
              <input
                type="password"
                id="txtOldPassword"
                name="oldPassword"
                className="form-control"
                placeholder="Senas slaptažodis"
                value={this.state.oldPassword}
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                required
              />
            </div>
            <div className="">
              <label className="form-label" htmlFor="txtNewPassword">Įveskite naują slaptažodį  <span className="fieldRequired">*</span></label>
            </div>
            <div className=" form-group mb-3">
              <p className="text-primary">Dėmesio! Slaptažodis turi būti ne mažiau 8 simbolių ilgio, turėti bent vieną didžiąją ir mažąją raides ir bent vieną skaičių.</p>
              <input
                type="password"
                id="txtNewPassword"
                name="newPassword"
                className="form-control"
                placeholder="Naujas slaptažodis"
                value={this.state.newPassword}
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              />
            </div>
            <div className=" form-group mb-3">
              <label className="form-label" htmlFor="txtRepeatNewPassword">Pakartokite naują slaptažodį  <span className="fieldRequired">*</span></label>
              <input
                type="password"
                id="txtNewPasswordRepeat"
                name="newPasswordRepeat"
                className="form-control"
                placeholder="Pakartokite naują slaptažodį"
                value={this.state.newPasswordRepeat}
                onChange={this.handleChange}
                onInvalid={(e) => inputValidator(e)}
                required
                pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
              />
            </div>
            <div className=" form-group mb-3">
              <button type="submit" className="btn btn-primary">Išsaugoti</button>
            </div>
          </form>
        </div>
      )
    }
    else {
      return (
        <button
          className="btn btn-primary"
          onClick={this.handleUpdatePasswordButton}
        >Keisti
        </button>
      )
    }
  }

  /** Update password button handler */
  handleUpdatePasswordButton() {
    this.setState({
      passwordUpdate: true
    })
  }

  /** Update password submit handler */
  handleUpdatePasswordSubmit(e) {
    e.preventDefault();
    if (this.state.newPassword !== this.state.newPasswordRepeat) {
      swal({
        text: "Slaptažodžiai nesutampa.",
        button: "Gerai"
      })
    }
    else {
      http.put(`${apiEndpoint}/api/users/updatepassword/${this.state.oldPassword}/${this.state.newPassword}`, {
      }).then((response) => {
        swal({
          text: "Naudotojo slaptažodis atnaujintas sėkmingai",
          button: "Gerai"
        }).then(() => {
          this.setState({
            passwordUpdate: false,
            oldPassword: "",
            newPassword: "",
            newPasswordRepeat: ""
          })
        })
      })
        .catch((error) => {
          //console.log(error);
          swal({
            text: error.response.data,
            button: "Gerai"
          })
        })
    }
  }

  render() {

    const currenUserRole = this.state.role;

    return (

      <div className="container pt-4">

        <h6 className="py-3">Redaguoti duomenis</h6>

        <div className="row">
          <div className="form col-lg-7" >
            <form onSubmit={this.handleSubmit}>
              {this.drawUpdateForm(this.state.role)}

              <button type="submit" id="btnSubmit" className="btn btn-primary">Išsaugoti</button>

            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-12 pt-3">
            <h6 className="py-3">Naudotojo prisijungimo informacija</h6>
          </div>

          <div className="col-3">
            <p>Naudotojo vardas</p>
          </div>
          <div className="col-9">
            <p>{this.state.username}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <h6 className="py-3">Keisti slaptažodį</h6>
          </div>

          <div className="col-lg-7">
            {this.drawUpdatePasswordForm()}
          </div>

        </div>

        {currenUserRole === 'USER' &&
          <div>
            <h6 className="pt-4">Tvarkyti paskyrą</h6>

            <div className="row">

              <div className="col-12">
                <DownloaderContainer />
              </div>

              <div className="col-12 py-3">
                <ForgetMe />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}

