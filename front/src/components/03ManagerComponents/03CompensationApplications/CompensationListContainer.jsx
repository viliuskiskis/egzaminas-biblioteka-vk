import React, { Component } from "react";
import http from "../../00Services/httpService";
import apiEndpoint from "../../00Services/endpoint";
import swal from "sweetalert";
import Pagination from "react-js-pagination";
import SearchBox from "../../05ReusableComponents/SeachBox";
import CompensationListTable from "./CompensationListTable";
import CompensationListTableNarrow from "./CompensationListTableNarrow";
import CompensationListCards from "./CompensationListCards";
import CompensationReviewComponent from "../../01CommonComponents/05ApplicationReview/CompensationReviewComponent";

const breakpointSm = 768;
const breakpointMd = 992;

export default class CompensationListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationPreview: false,
      compensations: [],
      pageSize: 10, // PAGE SIZE FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: "",
      width: "",

      id: 0,
      submitedAt: "",
      applicationStatus: "",
      approvalDate: "",
      kindergartenData: null,
      mainGuardian: null,
      birthdate: "",
      childName: "",
      childPersonalCode: "",
      childSurname: "",
      hiddenChildName: "",
      hiddenChildSurname: ""
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleCompensationReview = this.handleCompensationReview.bind(this);
    this.handleCompensationDeactivate = this.handleCompensationDeactivate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCompensationConfirm = this.handleCompensationConfirm.bind(this);
    this.handleReturn = this.handleReturn.bind(this);
  }

  componentDidMount() {
    this.getCompensations(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
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

  getCompensations(page, size, filter) {
    http.get(`${apiEndpoint}/api/kompensacijos/manager?pageNumber=${page - 1}&pageSize=${size}&filter=${filter}`)
      .then(response => {
        this.setState({
          compensations: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1
        });
      }).catch(error => {
        swal({
          text: "Įvyko klaida perduodant duomenis",
          button: "Gerai"
        })
      })
  }

  handleSearch(e) {
    this.setState({ searchQuery: e.currentTarget.value });
    setTimeout(() => {
      this.getCompensations(1, this.state.pageSize, this.state.searchQuery);
    }, 100);
  }

  handlePageChange(page) {
    this.setState({ currentPage: page });
    this.getCompensations(page, this.state.pageSize, this.state.searchQuery);
  }

  handleCompensationReview(id) {
    http.get(`${apiEndpoint}/api/kompensacijos/manager/${id}`)
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
    this.setState({
      applicationPreview: true
    })
  }

  handleReturn() {
    this.setState({
      applicationPreview: false
    })
  }

  handleCompensationDeactivate(item) {
    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nAr tikrai norite atmesti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.post(`${apiEndpoint}/api/kompensacijos/manager/deactivate/${item.id}`)
          .then(response => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getCompensations(this.state.currentPage, this.state.pageSize, "");
          }).catch(error => {
            swal({
              text: "Įvyko klaida" + error.response.data,
              button: "Gerai"
            })
          })
      }
    })
  }

  handleCompensationConfirm(item) {
    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\nAr tikrai norite patvirtinti prašymą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        http.post(`${apiEndpoint}/api/kompensacijos/manager/confirm/${item.id}`)
          .then(response => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getCompensations(this.state.currentPage, this.state.pageSize, "");
          }).catch(error => {
            swal({
              text: "Įvyko klaida" + error.response.data,
              button: "Gerai"
            })
          })
      }
    })
  }

  render() {
    let size = 0;
    let pageRange = this.state.width > breakpointSm ? 15 : 8;
    if (this.state.compensations !== undefined) size = this.state.compensations.length;

    if (this.state.applicationPreview) {
      return (
        <CompensationReviewComponent
          state={this.state}
          role={"manager"}
          handleReturn={this.handleReturn}
        />
      )
    } else {
      return (
        <div className="container pt-4">
          <h6 className="ps-2 pt-3">Prašymai gauti kompensaciją</h6>

          {(size > 0 || this.state.searchQuery !== "") &&
            <SearchBox
              value={this.state.searchQuery}
              onSearch={this.handleSearch}
              placeholder={"Ieškoti pagal vaiko asmens kodą..."}
            />
          }

          {this.state.width >= breakpointMd ?
            <CompensationListTable
              compensations={this.state.compensations}
              handleCompensationReview={this.handleCompensationReview}
              handleCompensationDeactivate={this.handleCompensationDeactivate}
              handleCompensationConfirm={this.handleCompensationConfirm}
            />
            :
            this.state.width >= breakpointSm ?
              <CompensationListTableNarrow
                compensations={this.state.compensations}
                handleCompensationReview={this.handleCompensationReview}
                handleCompensationDeactivate={this.handleCompensationDeactivate}
                handleCompensationConfirm={this.handleCompensationConfirm}
              />
              :
              <CompensationListCards
                compensations={this.state.compensations}
                handleCompensationReview={this.handleCompensationReview}
                handleCompensationDeactivate={this.handleCompensationDeactivate}
                handleCompensationConfirm={this.handleCompensationConfirm}
              />
          }

          {this.state.totalPages > 1 &&
            <div className="d-flex justify-content-center">
              <Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={this.state.currentPage}
                itemsCountPerPage={this.state.pageSize}
                totalItemsCount={this.state.totalElements}
                pageRangeDisplayed={pageRange}
                onChange={this.handlePageChange}
              />
            </div>
          }

        </div>
      )
    }
  }
}