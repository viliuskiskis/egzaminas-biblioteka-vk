import React from 'react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import http from '../../00Services/httpService';
import apiEndpoint from '../../00Services/endpoint';
import AuthContext from "../../00Services/AuthContext";

export default function ForgetMe() {

  const { dispatch } = React.useContext(AuthContext);
  const history = useHistory();

  const handleForgetMe = () => {

    swal({
      text: "DĖMESIO! Šio veiksmo negalėsite atšaukti!\n\n" +
        "Patvirtinus veiksmą, bus ištrinta Jūsų paskyra ir prašymai.\n" +
        "Ar tikrai norite ištrinti savo paskyrą?",
      buttons: ["Ne", "Taip"],
      dangerMode: true,
    }).then((actionConfirmed) => {
      if (actionConfirmed) {

        http.delete(`${apiEndpoint}/api/users/user/deletemydata`)
          .then(() => {
            http.post(`${apiEndpoint}/logout`)
              .then(() => {
                swal({
                  text: "Ištrinta sėkmingai",
                  button: "Gerai",
                });
              })
          }).then(() => {
            dispatch({
              type: "LOGOUT"
            })
            history.push("/")
          }).catch(() => { });
      }
    })
  }

  return (
    <button
      onClick={handleForgetMe}
      id="btnFrogetMeAndLogout"
      className="btn btn-outline-danger "
    >Ištrinti mano paskyrą
    </button>
  )
}

