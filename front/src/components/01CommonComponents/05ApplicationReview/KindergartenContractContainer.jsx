import React, { Component } from "react";
import apiEndpoint from "../../00Services/endpoint";
import http from "../../00Services/httpService";
import swal from "sweetalert";
import KindergartenContractComponent from "./KindergartenContractComponent";
//import AdmissionReviewComponent from "./AdmissionReviewComponent";
import AuthContext from "../../00Services/AuthContext";

export default class KindergartenContractContainer extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      submitedAt: "",
      status: "",
      childName: "",
      childSurname: "",
      childPersonalCode: "",
      approvalDate: "",
      birthdate: "",
      numberInWaitingList: "",
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
      additionalGuardian: {
        personalCode: "",
        name: "",
        surname: "",
        email: "",
        address: "",
        phone: ""
      },
      approvedKindergarten: "",
      approvedKindergartenManager: "",
      kindergartenChoices: {
        kindergarten1: "",
        kindergarten2: "",
        kindergarten4: "",
        kindergarten5: ""
      },
      priorities: {
        livesInVilnius: false,
        childIsAdopted: false,
        familyHasThreeOrMoreChildrenInSchools: false,
        guardianInSchool: false,
        guardianDisability: false,
        livesMoreThanTwoYears: false
      }
    };
    this.handleReturn = this.handleReturn.bind(this);
    this.handleDownloadContract = this.handleDownloadContract.bind(this);
  };

  componentDidMount() {
    this.getUserApplication();
  }

  getUserApplication() {
    let role = this.context.state.role.toLowerCase();
    http.get(`${apiEndpoint}/api/prasymai/${role}/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          id: response.data.id,
          submitedAt: response.data.submitedAt,
          status: response.data.status,
          childName: response.data.childName,
          childSurname: response.data.childSurname,
          childPersonalCode: response.data.childPersonalCode,
          approvalDate: response.data.approvalDate,
          birthdate: response.data.birthdate,
          numberInWaitingList: response.data.numberInWaitingList,
          mainGuardian: response.data.mainGuardian,
          mainGuardianName: response.data.mainGuardian.name,
          mainGuardianSurname: response.data.mainGuardian.surname,
          mainGuardianPhone: response.data.mainGuardian.phone,
          mainGuardianEmail: response.data.mainGuardian.email,
          mainGuardianAddress: response.data.mainGuardian.address,
          additionalGuardian: response.data.additionalGuardian,
          additionalGuardianName: response.data.additionalGuardian.name,
          additionalGuardianSurname: response.data.additionalGuardian.surname,
          additionalGuardianPhone: response.data.additionalGuardian.phone,
          additionalGuardianEmail: response.data.additionalGuardian.email,
          additionalGuardianAddress: response.data.additionalGuardian.address,
          approvedKindergarten: response.data.approvedKindergarten,
          approvedKindergartenManager: response.data.approvedKindergartenManager,
          kindergartenChoices: response.data.kindergartenChoices,
          priorities: response.data.priorities
        })
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis iš serverio: " + JSON.stringify(error),
          button: "Gerai"
        })
      });
  }


  handleDownloadContract(data) {
    http.request({
      url: `${apiEndpoint}/api/contract/user/${data.id}`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download',
        `Ikimokyklinio ugdymo sutartis, ${data.childName} ${data.childSurname}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }).catch(error => {
      swal({
        text: "Įvyko klaida atsisiunčiant sutartį.",
        button: "Gerai"
      })
    })
  }


  handleReturn() {
    let route = this.context.state.role === "USER" ? "/prasymai" : "/eile";
    this.props.history.push(route);
  }

  render() {
    return (
      <KindergartenContractComponent
        state={this.state}
        role={this.context.state.role}
        handleDownloadContract={this.handleDownloadContract}
        handleReturn={this.handleReturn}
      />
    )
  }
}