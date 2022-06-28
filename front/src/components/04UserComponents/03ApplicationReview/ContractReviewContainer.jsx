import React, { Component } from "react";
import apiEndpoint from "../../00Services/endpoint";
import http from "../../00Services/httpService";
import swal from "sweetalert";
import AuthContext from "../../00Services/AuthContext";

export default class ContractReviewContainer extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      fileUrl: ""
    }
    this.handleReturn = this.handleReturn.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  };

  componentDidMount() {
    this.getContract();
  }

  handleDownload() {
    const link = document.createElement("a");
    link.href = this.state.fileUrl;
    link.setAttribute("download",
      `Ikimokyklinio ugdymo sutartis ${this.props.match.params.id}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  handleReturn() {
    this.props.history.push("/prasymai");
  }

  getContract() {
    let role = this.context.state.role.toLowerCase();
    http.request({
      url: `${apiEndpoint}/api/contract/${role}/${this.props.match.params.id}`,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      const file = new Blob([response.data], { type: "application/pdf" });
      const fileUrl = URL.createObjectURL(file);
      this.setState({
        file: file,
        fileUrl: fileUrl
      })
    }).catch(error => {
      swal({
        text: "Įvyko klaida atsisiunčiant sutartį.",
        button: "Gerai"
      })
    });
  }

  render() {

    return (
      <div className="container pt-4">

        <iframe
          className="pdf-container"
          title="whatever"
          src={this.state.fileUrl}
          width="100%"
          height="100%"
        />

        <div className="d-flex">
          <button
            id="btnDownloadContract"
            className="btn btn-success btn-block me-2"
            onClick={this.handleDownload}
          >Parsisiųsti
          </button>
          <button
            id="btnBackToApplicationList"
            className="btn btn-primary btn-block"
            onClick={this.handleReturn}
          >Grįžti
          </button>
        </div>

      </div>
    )
  }
}