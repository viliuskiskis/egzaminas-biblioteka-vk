import React, { Component } from 'react';
import swal from 'sweetalert';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import UserApplicationsTable from './UserApplicationsTable';
import UserCompensationsTable from './UserCompensationsTable';
import UserApplicationsCards from './UserApplicationsCards';
import UserCompensationsCards from './UserCompensationsCards';

const breakpoint = 768;

export default class UserHomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      compensations: [],
      width: ""
    }
    this.handleContractDownload = this.handleContractDownload.bind(this);
    this.handleKindergartenContract = this.handleKindergartenContract.bind(this);
  }

  componentDidMount() {
    this.getUserApplications();
    this.getUserCompensations();
    window.addEventListener("resize", this.update);
    this.update();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.update);
  }

  update = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  getUserApplications() {
    http.get(`${apiEndpoint}/api/prasymai/user`)
      .then((response) => {
        this.setState({ applications: response.data });
      }).catch(() => { });
  }

  getUserCompensations() {
    http.get(`${apiEndpoint}/api/kompensacijos/user`)
      .then(response => {
        this.setState({ compensations: response.data });
      }).catch(() => { });
  }

  handleApplicationDelete = (applicationId) => {
    swal({
      text: "Ar tikrai norite ištrinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.delete(`${apiEndpoint}/api/prasymai/user/delete/${applicationId}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            })
          }).then(() => {
            this.getUserApplications()
          }).catch(() => { })
      }
    });
  }

  handleCompensationDelete = (compensationId) => {
    swal({
      text: "Ar tikrai norite ištrinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.delete(`${apiEndpoint}/api/kompensacijos/user/delete/${compensationId}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            })
          }).then(() => {
            this.getUserCompensations();
          }).catch(() => { });
      }
    });
  }

  handleApplicationReview = (application) => {
    application.status === "Patvirtintas" ?
      this.props.history.push(`/sutartis/${application.id}`)
      : this.props.history.push(`/prasymas/priimti/${application.id}`)
  }

  handleKindergartenContract = (applicationId) => {
    this.props.history.push(`/prasymas/pasirasymui/${applicationId}`)
  }

  handleCompensationReview = (compensationId) => {
    this.props.history.push(`/prasymas/kompensuoti/${compensationId}`)
  }

  handleCompensationContractReview = (compensationId) => {
    this.props.history.push(`/prasymas/kompensuoti_sutartis/${compensationId}`)
  }

  handleContractDownload(data) {
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

  render() {
    const { length: ApplicationCount } = this.state.applications;
    const { length: CompensationCount } = this.state.compensations;

    return (
      <div>
        {ApplicationCount === 0 && CompensationCount === 0 &&
          <div className="container pt-5"><h6 className="pt-5">Jūs neturite pateiktų prašymų.</h6></div>
        }

        <div className="container pt-4" >

          {this.state.applications.filter(item => item.status === "Patvirtintas").length > 0 &&
            <div className="alert alert-warning p-1" role="alert">
              <h6>Jūs turite patvirtintų prašymų, kuriuos galite peržiūrėti ir parsisiųsti sutartį pasirašymui.</h6>
            </div>
          }

          {ApplicationCount !== 0 &&
            <div>
              <h6 className="ps-2 pt-3">Mano prašymai į valstybinius darželius</h6>
              <div className="row pt-2">
                <div className="col-12">

                  {this.state.width > breakpoint ?
                    <UserApplicationsTable
                      applications={this.state.applications}
                      handleApplicationDelete={this.handleApplicationDelete}
                      handleApplicationReview={this.handleApplicationReview}
                      handleContractDownload={this.handleContractDownload}
                      handleKindergartenContract={this.handleKindergartenContract}
                    />
                    :
                    <UserApplicationsCards
                      applications={this.state.applications}
                      handleApplicationDelete={this.handleApplicationDelete}
                      handleApplicationReview={this.handleApplicationReview}
                      handleContractDownload={this.handleContractDownload}
                      handleKindergartenContract={this.handleKindergartenContract}
                    />
                  }

                </div>
              </div>
            </div>
          }

          {this.state.width <= breakpoint &&
            <div><br /><br /></div>
          }

          {CompensationCount !== 0 &&
            <div>
              <h6 className="ps-2 pt-3">Mano prašymai dėl kompensacijos</h6>
              <div className="row pt-2">
                <div className="col-12">

                  {this.state.width > breakpoint ?
                    <UserCompensationsTable
                      compensations={this.state.compensations}
                      handleCompensationDelete={this.handleCompensationDelete}
                      handleCompensationReview={this.handleCompensationReview}
                      handleCompensationContractReview={this.handleCompensationContractReview}
                    />
                    :
                    <UserCompensationsCards
                      compensations={this.state.compensations}
                      handleCompensationDelete={this.handleCompensationDelete}
                      handleCompensationReview={this.handleCompensationReview}
                      handleCompensationContractReview={this.handleCompensationContractReview}
                    />
                  }
                </div>
              </div>
            </div>
          }

        </div>
      </div>
    )
  }
}