import React from 'react';
import { useHistory } from 'react-router-dom';
import http from '../00Services/httpService';
import apiEndpoint from '../00Services/endpoint';
import AuthContext from "../00Services/AuthContext";
import swal from 'sweetalert';

export default function Logout() {

  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();

  const handleLogout = e => {
    http
      .post(`${apiEndpoint}/logout`)
      .then(response => {
        dispatch({
          type: "LOGOUT"
        })
        history.push("/")
      })
      .catch(error => {
        swal({
          text: "Įvyko klaida",
          button: "Gerai"
        })
      });
  }

  return (
    <div>
      <button
        id="btnLogout"
        className="btn btn-outline-primary "
        onClick={handleLogout}
      >Atsijungti
      </button>
    </div>
  )
}
