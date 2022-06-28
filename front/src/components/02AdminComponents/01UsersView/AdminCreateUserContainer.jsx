import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import swal from 'sweetalert';
import inputValidator from '../../00Services/InputValidator';
import AdminCreateUserComponent from './AdminCreateUserComponent';

class AdminCreateUserContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      role: "ADMIN",
      name: "",
      surname: "",
      birthdate: "",
      personalCode: "",
      address: "",
      phone: "",
      email: ""
    }
    this.resetState = this.resetState.bind(this);
    this.roleDropdownOnChange = this.roleDropdownOnChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  resetState = () => {
    this.setState({
      name: "",
      surname: "",
      birthdate: "",
      personalCode: "",
      address: "",
      phone: "",
      email: ""
    })
  }

  roleDropdownOnChange(event) {
    event.preventDefault()
    this.setState({
      role: event.target.value,
    })
  }

  handleChange(event) {
    const target = event.target;
    inputValidator(event);
    this.setState({
      [target.name]: target.name === "email" ? target.value.toLowerCase() : target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    http.post(`${apiEndpoint}/api/users/admin/createuser`, {
      "address": this.state.address,
      "email": this.state.email,
      "name": this.state.name,
      "password": this.state.email,
      "personalCode": this.state.personalCode,
      "phone": this.state.phone,
      "role": this.state.role,
      "surname": this.state.surname,
      "username": this.state.email
    })
      .then(() => {
        swal({
          text: "Naujas naudotojas buvo sėkmingai sukurtas.",
          button: "Gerai"
        }).then(() => {
          this.props.history.push("/new")
          this.props.history.replace("/admin")
        })
      })
      .catch((error) => {

        swal({
          text: error.response.data,
          button: "Gerai"
        })
      })
  }

  render() {
    return (
      <AdminCreateUserComponent
        state={this.state}
        resetState={this.resetState}
        roleDropdownOnChange={this.roleDropdownOnChange}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

export default withRouter(AdminCreateUserContainer)