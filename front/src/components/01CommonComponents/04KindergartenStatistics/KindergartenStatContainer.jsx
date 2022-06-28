import React, { Component } from 'react';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import KindergartenStatTable from './KindergartenStatTable';
import Pagination from "react-js-pagination";

const breakpoint = 768;

export default class KindergartenStatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darzeliai: [],
      pageSize: 10, // FUNCTIONALITY NOT YET IMPLEMENTED
      currentPage: 1,
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      width: ""
    };
  };

  componentDidMount() {
    this.getKindergartenStat(this.state.currentPage);
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

  getKindergartenStat(currentPage) {

    const { pageSize } = this.state;
    currentPage -= 1;

    var uri = `${apiEndpoint}/api/darzeliai/statistics?page=${currentPage}&size=${pageSize}`;

    http
      .get(uri)
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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
    this.getKindergartenStat(page);
  };


  render() {
    let count = 0;
    let pageRange = this.state.width > breakpoint ? 15 : 8;

    if (this.state.darzeliai !== undefined) count = this.state.darzeliai.length;

    if (count === 0) return <div className="container pt-5"><h6 className="pt-5">Informacija ruošiama</h6></div>

    return (

      <div className="container pt-4" >

        <h6 className="ps-2 pt-3">Prašymų statistika</h6>

        <div className="row pt-2">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12">

            <KindergartenStatTable
              darzeliai={this.state.darzeliai}
            />

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

        </div>
      </div>
    )
  }
}