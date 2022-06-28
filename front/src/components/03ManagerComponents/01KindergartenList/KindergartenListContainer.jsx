import React, { Component } from 'react';
import swal from 'sweetalert';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import KindergartenListTable from './KindergartenListTable';
import KindergartenListCards from './KindergartenListCards';
import Pagination from "react-js-pagination";
import SearchBox from '../../05ReusableComponents/SeachBox';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const provider = new OpenStreetMapProvider();
const breakpoint = 768;

export default class KindergartenListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darzeliai: [],
      elderates: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      searchQuery: "",
      inEditMode: false,
      editRowId: "",
      editedKindergarten: null,
      errorMessages: {},
      isDisabled: false,
      width: ""
    }
    this.getKindergartenInfo = this.getKindergartenInfo.bind(this);
  }

  componentDidMount() {
    this.getKindergartenInfo(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
    this.getElderates();
    document.addEventListener("keydown", this.handleEscape, false);
    window.addEventListener("resize", this.update);
    this.update();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEscape, false);
    window.removeEventListener("resize", this.update);
  }

  update = () => {
    this.setState({
      width: window.innerWidth
    })
  }

  handleEscape = (e) => {
    if (e.key === 'Escape') {
      this.onCancel();

      setTimeout(function () {
        window.location.reload();
      }, 10);
    }
  }

  getKindergartenInfo(page, size, filter) {
    http.get(`${apiEndpoint}/api/darzeliai/manager/page?page=${page - 1}&size=${size}&filter=${filter}`)
      .then((response) => {
        this.setState({
          darzeliai: response.data.content,
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1
        });
      }).catch(() => { });
  }

  getElderates() {
    http.get(`${apiEndpoint}/api/darzeliai/manager/elderates`)
      .then((response) => {
        this.setState({ elderates: response.data });
      }).catch(() => { });
  }

  handleSearch = (e) => {
    this.setState({ searchQuery: e.currentTarget.value });
    setTimeout(() => {
      this.getKindergartenInfo(1, this.state.pageSize, this.state.searchQuery);
    }, 100);
  }

  handleDelete = (item) => {
    swal({
      text: "Ar tikrai norite ištrinti darželį?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {
        const { currentPage, numberOfElements } = this.state;
        let page = numberOfElements === 1 ? (currentPage - 1) : currentPage;
        page = page < 1 ? 1 : page;
        http.delete(`${apiEndpoint}/api/darzeliai/manager/delete/${item.id}`)
          .then((response) => {
            swal({
              text: response.data,
              button: "Gerai"
            });
          }).then(() => {
            this.getKindergartenInfo(page, this.state.pageSize, this.state.searchQuery);
          }).catch(() => { });
      }
    });
  }

  handleEditKindergarten = (item) => {
    this.setState({
      inEditMode: true,
      editRowId: item.id,
      editedKindergarten: item
    });
  }

  onCancel = () => {
    this.setState(
      {
        inEditMode: false,
        editRowId: "",
        editedKindergarten: null
      }
    );
    this.setState({ errorMessages: {} });
    this.getKindergartenInfo(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
  }

  handleChange = ({ target: input }) => {
    const errorMessages = this.state.errorMessages;

    if (input.validity.valueMissing || input.validity.patternMismatch || input.validity.rangeUnderflow || input.validity.rangeOverflow) {
      errorMessages[input.name] = `*${input.title}`;
    } else {
      delete errorMessages[input.name];
    }
    const kindergarten = this.state.editedKindergarten;
    kindergarten[input.name] = input.value;
    this.setState({
      editedKindergarten: kindergarten,
      errorMessages: errorMessages
    });
  }

  handleUpdateCoordinates = () => {
    const kindergarten = this.state.editedKindergarten;
    this.setState({ isDisabled: true });
    setTimeout(() => {
      this.setState({ isDisabled: false });
    }, 1500);
    if (kindergarten.address === "") {
      kindergarten.latitude = "";
      kindergarten.longitude = "";
    } else {
      provider.search({ query: kindergarten.address + ", Vilnius, Lithuania" })
        .then(response => {
          if (typeof response[0] !== "undefined") {
            kindergarten.latitude = response[0].raw.lat;
            kindergarten.longitude = response[0].raw.lon;
          } else {
            kindergarten.latitude = "";
            kindergarten.longitude = "";
          }
        }).catch(error => {
          alert(error);
        })
    }
    this.setState({
      editedKindergarten: kindergarten
    })
  }

  handleSaveEdited = () => {
    const { editedKindergarten, editRowId, errorMessages } = this.state;
    if (Object.keys(errorMessages).length === 0) {
      http.put(`${apiEndpoint}/api/darzeliai/manager/update/${editRowId}`, editedKindergarten)
        .then(() => {
          this.onCancel();
        }).then(() => {
          this.getKindergartenInfo(this.state.currentPage, this.state.pageSize, this.state.searchQuery);
        }).catch(error => {
          if (error && error.response.status === 409) {
            swal({
              text: error.response.data,
              button: "Gerai"
            });
          }
        })
    }
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getKindergartenInfo(page, this.state.pageSize, this.state.searchQuery);
  };

  render() {
    const { darzeliai, elderates, searchQuery, inEditMode, editRowId, errorMessages } = this.state;
    const hasErrors = Object.keys(errorMessages).length === 0 ? false : true;
    let pageRange = this.state.width >= breakpoint ? 15 : 8;

    return (
      <React.Fragment>

        <SearchBox
          value={searchQuery}
          onSearch={this.handleSearch}
          placeholder={"Ieškoti pagal pavadinimą..."}
        />

        {this.state.width >= breakpoint ?
          <KindergartenListTable
            darzeliai={darzeliai}
            elderates={elderates}
            inEditMode={inEditMode}
            editRowId={editRowId}
            errorMessages={errorMessages}
            hasErrors={hasErrors}
            onDelete={this.handleDelete}
            onEditData={this.handleEditKindergarten}
            onEscape={this.handleEscape}
            onChange={this.handleChange}
            onSave={this.handleSaveEdited}
            handleUpdateCoordinates={this.handleUpdateCoordinates}
            isDisabled={this.state.isDisabled}
            onCancel={this.onCancel}
          />
          :
          <KindergartenListCards
            darzeliai={darzeliai}
            elderates={elderates}
            inEditMode={inEditMode}
            editRowId={editRowId}
            errorMessages={errorMessages}
            hasErrors={hasErrors}
            onDelete={this.handleDelete}
            onEditData={this.handleEditKindergarten}
            onEscape={this.handleEscape}
            onChange={this.handleChange}
            onSave={this.handleSaveEdited}
            handleUpdateCoordinates={this.handleUpdateCoordinates}
            isDisabled={this.state.isDisabled}
            onCancel={this.onCancel}
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

      </React.Fragment>
    )
  }
}