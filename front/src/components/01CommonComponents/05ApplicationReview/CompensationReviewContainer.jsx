import React, { Component } from "react";
import apiEndpoint from "../../00Services/endpoint";
import http from "../../00Services/httpService";
import swal from "sweetalert";
import CompensationReviewComponent from "./CompensationReviewComponent";
import AuthContext from "../../00Services/AuthContext";

export default class CompensationReviewContainer extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      submitedAt: "",
      applicationStatus: "",
      approvalDate: "",
      kindergartenData: {
        entityName: "",
        code: "",
        phone: "",
        email: "",
        address: "",
        account: "",
        bankCode: "",
        bankName: ""
      },
      mainGuardian: {
        userId: 0,
        role: "",
        name: "",
        surname: "",
        personalCode: "",
        address: "",
        phone: "",
        email: "",
        username: ""
      },
      birthdate: "",
      childName: "",
      childPersonalCode: "",
      childSurname: "",
      hiddenChildName: "",
      hiddenChildSurname: ""
    };
    this.handleReturn = this.handleReturn.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.getUserCompensation();
  }

  getUserCompensation() {
    let role = this.context.state.role.toLowerCase();
    http.get(`${apiEndpoint}/api/kompensacijos/${role}/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          submitedAt: response.data.submitedAt,
          applicationStatus: response.data.applicationStatus,
          approvalDate: response.data.approvalDate,
          kindergartenData: response.data.kindergartenDataInfo,
          mainGuardian: response.data.mainGuardianInfo,
          birthdate: response.data.childDataInfo.birthdate,
          childName: response.data.childDataInfo.childName,
          childPersonalCode: response.data.childDataInfo.childPersonalCode,
          childSurname: response.data.childDataInfo.childSurname,
          hiddenChildSurname: response.data.childDataInfo.childSurname,
          hiddenChildName: response.data.childDataInfo.childName
        })
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }

  handleDelete = () => {
    swal({
      text: "Ar tikrai norite ištrinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.delete(`${apiEndpoint}/api/kompensacijos/user/delete/${this.state.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            })
          }).then(() => {
            this.props.history.push("/prasymai")
          }).catch(() => { });
      }
    });
  }

  handleReturn() {
    let route = this.context.state.role === "USER" ? "/prasymai" : "/kompensacijos";
    this.props.history.push(route);
  }

  render() {
    return (
      <CompensationReviewComponent
        state={this.state}
        role={this.context.state.role}
        handleDelete={this.handleDelete}
        handleReturn={this.handleReturn}
      />
    )
  }
}
