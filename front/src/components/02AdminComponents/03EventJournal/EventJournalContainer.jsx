import React, { Component } from 'react';
import Pagination from "react-js-pagination";
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import Spinner from '../../05ReusableComponents/Spinner'
import SearchBox from "../../05ReusableComponents/SeachBox";
import EventJournalTable from './EventJournalTable';
import EventJournalCards from './EventJournalCards';
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import lt from "date-fns/locale/lt";

const breakpoint = 768;
registerLocale("lt", lt);

export default class EventJournalContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      entriesLoaded: false,
      searchQuery: "",
      width: "",
      startTime: null,
      endTime: null
    };
    this.getJournalEntries = this.getJournalEntries.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  };

  componentDidMount() {
    this.getJournalEntries(
      this.state.currentPage,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.startTime,
      this.state.endTime
    );
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

  getJournalEntries(page, size, username, startTime, endTime) {
    let uri = `${apiEndpoint}/admin/getjournal/page`;

    if (startTime !== null) {
      startTime = new Date(startTime);
      startTime.setMinutes(startTime.getMinutes() - startTime.getTimezoneOffset());
    }

    if (endTime !== null) {
      endTime = new Date(endTime);
      endTime.setMinutes(endTime.getMinutes() - endTime.getTimezoneOffset());
    }
    let data = {
      page: page - 1,
      size: size,
      username: username,
      startTime: startTime,
      endTime: endTime
    }

    http.post(uri, data)
      .then((response) => {
        this.setState({
          entries: response.data.content.map((entry) => ({
            ...entry,
            id: entry.entryID
          })),
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          currentPage: response.data.number + 1,
          entriesLoaded: true
        });
      })
      .catch(() => { });
  }

  handleSearch(e) {
    this.setState({ searchQuery: e.currentTarget.value });
    setTimeout(() => {
      this.getJournalEntries(
        1,
        this.state.pageSize,
        this.state.searchQuery,
        this.state.startTime,
        this.state.endTime
      );
    }, 100);
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getJournalEntries(
      page,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.startTime,
      this.state.endTime
    );
  };

  handleStartTimeChange(startTime) {
    this.setState({ startTime: startTime });
    this.getJournalEntries(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      startTime,
      this.state.endTime
    );
  }

  handleEndTimeChange(endTime) {
    this.setState({ endTime: endTime });
    this.getJournalEntries(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.startTime,
      endTime
    );
  }

  resetStartTime() {
    this.setState({ startTime: null });
    this.getJournalEntries(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      null,
      this.state.endTime
    );
  }

  resetEndTime() {
    this.setState({ endTime: null });
    this.getJournalEntries(
      1,
      this.state.pageSize,
      this.state.searchQuery,
      this.state.startTime,
      null
    );
  }

  render() {
    let pageRange = this.state.width > breakpoint ? 15 : 8;

    return (
      <div className="container pt-4" >
        <h6 className="ps-2 pt-3">Sistemos įvykių žurnalas</h6>
        {this.state.entriesLoaded ? (
          <div>
            <div className="row">
              <div className="col-12 col-md-6">
                <SearchBox
                  value={this.state.searchQuery}
                  onSearch={this.handleSearch}
                  placeholder={"Ieškoti pagal naudotojo vardą (arba NULL)..."}
                />
              </div>
              <div className="col-6 col-md-3 d-flex my-3">
                <DatePicker
                  id="datePickerStartTime"
                  locale="lt"
                  utcOffset={2}
                  className="form-control"
                  selected={this.state.startTime}
                  // onSelect={(event) => this.handleStartTimeChange(event)}
                  onChange={(event) => this.handleStartTimeChange(event)}
                  showTimeSelect
                  selectsStart
                  startDate={this.state.startTime}
                  endDate={this.state.endTime}
                  dateFormat="Pp"
                  placeholderText="Laikas nuo..."
                />
                <button
                  id="buttonResetStartTime"
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => this.resetStartTime()}
                > x
                </button>
              </div>
              <div className="col-6 col-md-3 d-flex my-3">
                <DatePicker
                  id="datePickerEndTime"
                  locale="lt"
                  utcOffset={2}
                  className="form-control"
                  selected={this.state.endTime}
                  // onSelect={(event) => this.handleEndTimeChange(event)}
                  onChange={(event) => this.handleEndTimeChange(event)}
                  showTimeSelect
                  selectsEnd
                  startDate={this.state.startTime}
                  endDate={this.state.endTime}
                  dateFormat="Pp"
                  placeholderText="Laikas iki..."
                />
                <button
                  id="buttonResetEndTime"
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => this.resetEndTime()}
                > x
                </button>
              </div>
            </div>
            {this.state.width > breakpoint ?
              <EventJournalTable entries={this.state.entries} />
              :
              <EventJournalCards entries={this.state.entries} />
            }
          </div>
        ) : (<Spinner />)}

        {this.state.totalPages > 1 &&
          <div className="d-flex justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              activePage={this.state.currentPage}
              itemsCountPerPage={this.state.pageSize}
              totalItemsCount={this.state.totalElements}
              pageRangeDisplayed={pageRange}
              onChange={this.handlePageChange.bind(this)}
            />
          </div>
        }

      </div>
    )
  }
}
