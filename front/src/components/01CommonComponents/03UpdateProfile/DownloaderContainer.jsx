import React, { Component } from 'react';

import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';

export default class DownloaderContainer extends Component {

  getUserDetailsArchive() {

    const method = 'GET';
    const url = `${apiEndpoint}/api/users/user/zip`;

    http.request({
      url,
      method,
      responseType: 'blob'
    }).then(({ data }) => {

      const downloadUrl = window.URL.createObjectURL(new Blob([data]));

      const link = document.createElement('a');

      link.href = downloadUrl;
      link.setAttribute('download', 'naudotojas.zip');

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.document.activeElement.blur();

    }).catch(() => { });
  }

  render() {
    return (
      <button
        className="btn btn-link pt-3 px-0"
        onClick={this.getUserDetailsArchive}
        id="btnGetUserZip"
      >Atsisiųsti informaciją apie kaupiamus asmens duomenis (.zip)
      </button>
    )
  }
}